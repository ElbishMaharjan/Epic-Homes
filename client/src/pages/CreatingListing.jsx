import { useState } from "react";  // Import react hooks
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';  // Import Firebase dependencies
import { app } from '../firebase';
import { useSelector } from 'react-redux';      // For accessing Redux store state
import { useNavigate } from 'react-router-dom';  // For navigation

// This component is responsible for creating a new listing
export default function CreatingListing() {
    const {currentUser} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);         // adding State to manage selected image files, The state named files is used to keep track of the image files that the user has selected for upload, This line of code creates a state variable called files and a function called setFiles to update it. It initializes files as an empty array. initial value would be an empty, because we need to have dofferent images, because this is a multiple image
    const [formData, setFormData] = useState({      // State to manage form data, including image URLs, now we want to save this download urls inside a pice of stste. And as we have more than in piece of state moe than on variable inside of our application like name description and etc, we want to create form data and its initial value would be an empty array
        imageUrls: [], 
        name: '',       // Initialize form data state with default values
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        livingrooms: 1,
        kitchens: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    });

    const [imageUploadError, setImageUploadError] = useState(false);     // State to manage image upload error
    const [uploading, setUploading] = useState(false);                   // State to manage uploading status
    const [error, setError] = useState(false);                           // State to manage error message// creating a piece of state for tracking the errors and initial value is false
    const [loading, setLoading] = useState(false);                       // State to manage loading status
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


{/* Function to handle changes in form input fields.It updates the corresponding property in the formData state based on the input element's ID or type.For checkboxes, it updates the property based on the 'checked' status.*/}
const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent'){  // Check if the target element is a sale or rent checkbox// if any of them is checked then
        setFormData({                // set the formdata //Update 'type' property in formData for sale or rent checkboxes
            ...formData,            // keeping previous in formation
            type: e.target.id,      //the type variable we have as an input, it can be sale or rent
        });
    }

    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){    // Check if the target element is a parking, furnished, or offer checkbox
        setFormData({                       // Update boolean properties (parking, furnished, offer) in formData based on checkbox state
            ...formData,
            [e.target.id]: e.target.checked,  //e.target.id can be parking,furnished or offer, to be equal to e.target.checked can be true or false
        });
    }

    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea' ){   // Check if the target element is a number, text, or textarea input
        setFormData({                       // Update formData for number, text, and textarea input types
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

}; 


const handleSubmit = async (e) =>{    // Define an asynchronous function to handle form submission
    e.preventDefault();            // its going to prevent refreshing the page
    //going to request for the database to add these form data
    try { 
        if (formData.imageUrls.length < 1) return setError('You must upload at least one image'); // Check if there are no uploaded images
        if (+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower regular price');  // Check if the discount price is lower than the regular price
        setLoading(true);      // Set loading state to true
        setError(false);       // Reset error state// remove the previous error
        const res = await fetch('/api/listing/create', {   // Send a POST request to the '/api/listing/create' endpoint//we wana get response,use fetch method
            method: 'POST',                 // Specify the request method as 'POST'
            headers:{                   // Set the request headers to specify that the content type is JSON
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  // Convert the form data to JSON format and include the current user's ID
                ...formData,
                userRef: currentUser._id, 
            }),
        });
        const data = await res.json();       // This line parses the response body from the server as JSON format, making it accessible as a JavaScript object.// convert the response to JSON
        setLoading(false);
        if(data.success === false) {   // If the request was not successful, set the error message
            setError(data.message);
        }
        navigate(`/listing/${data._id}`); // Navigate to the newly created listing page
    } catch (error){
        setError(error.message);     // Set error message if an error occurs
        setLoading(false);           // Set loading state to false
    }
};

  return (
    <main className='p-3 max-w-4xl mx-auto'> {/*Main container*/}
        <h1 className='text-3xl font-semibold text-center my-7'>Creating a Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>       {/*Form component with an onSubmit event handler. handleSubmit function will be called when the form is submitted.*/}
            <div className='flex flex-col gap-4 flex-1'>
                {/*These input fields are controlled components, meaning their values are controlled by state (formData) and updated through the handleChange function.*/}
                <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required  
                onChange={handleChange} 
                value={formData.name}    
                />

                <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required 
                onChange={handleChange} 
                value={formData.description} 
                />
                
                <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required 
                onChange={handleChange} 
                value={formData.address} 
                />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' 
                        onChange={handleChange}   //adding onChange event listener, which is going to call handleChange function  must be checked if the type, inside our formData, the type is sale, we r going to check this one
                        checked={formData.type === "sale" } 
                        />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' 
                        onChange={handleChange} 
                        checked={formData.type === "rent" } 
                        />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' 
                        onChange={handleChange} 
                        checked={formData.parking}/>
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5'
                        onChange={handleChange} 
                        checked={formData.furnished}
                        />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' 
                        onChange={handleChange} 
                        checked={formData.offer}/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className=' flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bedrooms' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' 
                        onChange={handleChange} 
                        value={formData.bedrooms}
                        />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bathrooms' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' 
                        onChange={handleChange} 
                        value={formData.bathrooms}
                        />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='livingrooms' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' 
                        onChange={handleChange} 
                        value={formData.livingrooms}
                        />
                        <p>Living Rooms</p>
                    </div>
                    <div className=' flex items-center gap-2'>
                        <input type='number' id='kitchens' min='1' max='30' required className='p-3 border border-gray-300 rounded-lg' 
                        onChange={handleChange} 
                        value={formData.kitchens}
                        />
                        <p>Kitchens</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='regularPrice' min='50' max='999999999' required className='p-3 border border-gray-300 rounded-lg' 
                        onChange={handleChange} 
                        value={formData.regularPrice}
                        />
                        <div className='flex flex-col item-center'>
                        <p>Regular price</p>
                        <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>
                    {/* Conditional rendering for Discounted Price input field based on the 'offer' checkbox.If 'offer' is checked (true), display the Discounted Price input field; otherwise, hide it.*/}
                    {formData.offer && (
                    <div className='flex items-center gap-2'>
                        <input type='number' id='discountPrice' min='0' max='10000000' required className='p-3 border border-gray-300 rounded-lg' 
                        onChange={handleChange} 
                        value={formData.discountPrice}
                        />
                        <div className='flex flex-col item-center'>
                        <p>Discounted price</p>
                        <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>
                    )};
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
                <button disabled={loading || uploading}  className='p-3 bg-orange-600 text-white rounded-lg uppercase hover:bg-black'>{loading ? 'Creating...' : 'Create listing'}</button>  {/* Button to create a listing with conditional rendering based on loading and uploading status */}
                {error && <p className="text-red-700 text-sm">{error}</p>}        {/* Display error message if there's any */}
            </div>
            
        </form>
    </main>
  )
}
