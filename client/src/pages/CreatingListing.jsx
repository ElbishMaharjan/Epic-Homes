import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

// This component is responsible for creating a new listing
export default function CreatingListing() {
    const [files, setFiles] = useState([]);         // adding State to manage selected image files, The state named files is used to keep track of the image files that the user has selected for upload, This line of code creates a state variable called files and a function called setFiles to update it. It initializes files as an empty array. initial value would be an empty, because we need to have dofferent images, because this is a multiple image
    const [formData, setFormData] = useState({      // State to manage form data, including image URLs, now we want to save this download urls inside a pice of stste. And as we have more than in piece of state moe than on variable inside of our application like name description and etc, we want to create form data and its initial value would be an empty array
        imageUrls: [],            
    });

    const [imageUploadError, setImageUploadError] = useState(false);     // State to manage image upload error
    const [uploading, setUploading] = useState(false);                   // State to manage uploading status
    console.log(formData);

    // Function to handle image submission
    const handleImageSubmit = ()=> {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {   // Check if there are selected files and if the total number of images is greater than 0 and less than 7
            setUploading(true);                           // Set uploading status to true
            setImageUploadError(false);                    // Reset image upload error
            const promises = [];                           // Array to store promises for each file upload,//Promise= we r going to upload not only one image, we want to upload more than one image. so we r going to have more than one asynchronous behaviour. So we need to wait for all of them. So one by one, images should be uploaded to the storage, and then we r going to get them here. so first,  we r going to return a promise more than one promise and set it as empty bracket an then based on the length of the files we want to call a function and do it.

            for (let i = 0; i < files.length; i++) {        // Iterate through selected files and upload each one
                promises.push(storeImage(files[i]));         // Store image and push promise to array,,we want to add the new promise to (no.21 line) empty bracket, and call function storeimage, then going to upload the first (i) file. because if we have 3 file we r going to have,0,1,2 index
            }
            Promise.all(promises).then((urls) => {            // Execute all promises and update form data with image URLs,// after pushing out everything in the promise as we r waiting for the response(Promise.all) we need to wait for all of them adn then this is going to wait for every thing like all th file inside promises which we got it from the store image. and then we get url fro each of them.
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });  // Update form data with image URLs
                setImageUploadError(false);      // Reset image upload error,// then we want to setformdata,keep the previous information like name, description,etc and also we want to save the image urls, which is going to be each of these url, i dont want to replace everything, i want to kepp previous images inside the form data.and then add the new one that is added
                setUploading(false);             // Set uploading status to false
            }).catch(() => {
                setImageUploadError('Image upload failed (2 mb max per image)');     // Set image upload error
                setUploading(false);           // Set uploading status to false
            });

        } else{
            setImageUploadError('You can only upload 6 images per listing');  // Set image upload error
            setUploading(false);                           // Set uploading status to false
        }
    };

    // Function to store image in Firebase Storage
    const storeImage = async (file) => {                      //create function of (no.24)  and async because we need to wait for the response from the storage
        return new Promise((resolve, reject) => {             //return a new promise because we need to wait. And this is going to give us resolve me, which means we get the information back or reject pr getting an error
            const storage = getStorage(app);                  // Get Firebase Storage instance and create reference to storage location
            const fileName = new Date().getTime() + file.name;  // making filename unique
            const storageRef = ref(storage, fileName);
            const UploadTask = uploadBytesResumable(storageRef, file);   // Upload file to storage location
            UploadTask.on(             // Handle upload state changes
                "state_changed",
                (snapshot) =>{
                    // Track upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
                },
                (error)=>{
                    reject(error);        // Reject promise if there's an error
                },
                ()=> {
                    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {     // Once upload is complete, get download URL and resolve promise,, if there is no error we want to get the URL using method getdownloadurl
                        resolve(downloadURL);  // Resolve promise with download URL, all the download url are going to be stored in ( line.no24) promises.push
                    });
                }
            );
        });
    };


// Function to handle image removal
  const handleRemoveImage = (index) => { //input as index
    // Remove image URL at specified index from form data
    setFormData({                                                   
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index), //This line updates the imageUrls array in the form data by filtering out the element at the specified index (index) using the filter method. It keeps all elements except the one at the specified index.//
    });
  };    


  return (
    <main className='p-3 max-w-4xl mx-auto'> {/*Main container*/}
        <h1 className='text-3xl font-semibold text-center my-7'>Creating a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
                <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required />
                <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' />
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className=' flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bedrooms' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bathrooms' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='livingrooms' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' />
                        <p>Living Rooms</p>
                    </div>
                    <div className=' flex items-center gap-2'>
                        <input type='number' id='kitchens' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' />
                        <p>Kitchens</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='regularPrice' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' />
                        <div className='flex flex-col item-center'>
                        <p>Regular price</p>
                        <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='discountedPrice' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' />
                        <div className='flex flex-col item-center'>
                        <p>Discounted price</p>
                        <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col flex-1 gap-4'> 
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'> The first image will be the cover (max 6) </span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e)=> setFiles(e.target.files) }   className='p-3 border-gray-300 rounded w-full'  type='file' id='images' accept='image/*' multiple />{/* File input to select images */}
                    <button type="button" disabled={uploading} onClick={handleImageSubmit}  className='p-3 text-orange-700 border border-orange-700 rounded uppercase hover:bg-black '>{uploading ? 'Uploading...' : 'Upload'}</button> {/* onclick event listener, wheen we click  on it we want to submit these file and call function handleImage// when it uploading, just say uploading, otherwise ,just say upload disable whie its uploading */}
                </div>
                <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p> {/* Display image upload error message if present// if there is image upload error, then throw that error  imageUploadError */}
                {/* Mapping over the image URLs in the form data and displaying each image with a delete button */}
                {      
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => ( // we get the url and also we can get index
                        <div key={url} className="flex justify-between p-3 border items-center">  {/*also we need a key for this one ,because we're using map, you need always to have a keyand key is going to be that url, which is unique*/}
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                        <button type="button" onClick={() => handleRemoveImage(index)} className="p-3 text-red-700  border border-orange-700  rounded  uppercase hover:bg-black">Delete</button> {/* Button to delete an uploaded image, passsing index ,,need to add a call back fuction because otherwise going to call this function even without clicking */}
                        </div>
                    ))
                }
                <button className='p-3 bg-orange-600 text-white rounded-lg uppercase hover:bg-black'>Create Listing</button>
            </div>
            
        </form>
    </main>
  )
}
