import  { useEffect, useState } from 'react';   // Importing useEffect and useState hooks from React
import { useParams } from 'react-router-dom';   // Importing useParams hook from React Router DOM
import { Swiper,  SwiperSlide } from 'swiper/react';   // Importing Swiper and SwiperSlide components from Swiper React
import SwiperCore from  'swiper';                  // Importing the main SwiperCore module from Swiper
import { useSelector } from  'react-redux';         // Using useSelector to get access to Redux store state data
import { Navigation } from  'swiper/modules';      // Importing the Navigation module from Swiper
import 'swiper/css/bundle';                       // Importing Swiper CSS bundle
import { FaBath, FaBed,  FaUtensils, FaTv, FaChair, FaMapMarkerAlt, FaParking, }  from "react-icons/fa";    // Importing FontAwesome icons 
import Contact from '../components/Contact';

// Define the Listing component
export default function Listing() {
  SwiperCore.use([Navigation]);                  // Install the Navigation module for the Swiper component
    const [listing, setListing] = useState(null);        // Define a state variable 'listing' and a function 'setListing' to update it
    const [contact, setContact] = useState(false);       // Create a state variable called contact with initial value to work properly
    const params = useParams();    // Extract the URL parameters using the useParams hook from React Router
    const {currentUser} = useSelector((state) => state.user);



    // useEffect hook to fetch listing data when 'params.listingId' changes
    useEffect(() => {
        const fetchListing = async () => {   // Define an asynchronous function to fetch listing data
            const res = await fetch(`/api/listing/get/${params.listingId}`)   // Fetch listing data from the server based on the listing ID in the URL,creating variable=$params.ID using params hook from react
            const data  = await res.json();    // converting the response as JSON
            if (data.success === false) { // If the response indicates failure, return early
                return;
            }
            setListing(data);  // Update the 'listing' state with the fetched data 
        };
        fetchListing();     // Call the fetchListing function when 'params.listingId' changes
    },[params.listingId]);   // Depend on 'params.listingId' to trigger the effect when it changes
  
  
  
  // Render the main content of the Listing component
    return (
    <main>
      {listing &&        // Check if 'listing' data is available
      <div>
      <Swiper navigation>       {/* Render a Swiper component for displaying images */}
        {listing.imageUrls.map((url) =>(     // Map over 'imageUrls' array and render each image as a SwiperSlide,Image is stored in imageUrls
          <SwiperSlide key={url}>   {/* using key because of using map and key is unique which is yrl*/}
            <div className='h-[500px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover',}}>  {/*Render a background image using the provided URL */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
        <p className='text-2xl font-semibold'>
          {listing.name} -${''}   {/* Display the name of the listing*/}
          {listing.offer ?        // Display the price of the listing
            listing.discountPrice.toLocaleString('en-US')     // If there's a discount offer, display the discounted price,// Convert the price to a string format with US English locale, which includes comma separators for thousands.
          : listing.regularPrice.toLocaleString('en-US')}     {/*If there's no discount offer, display the regular price*/}
          {listing.type === 'rent' && ' / month'}      {/*Check if the listing type is 'rent', and if so, add '/ month' to indicate monthly rent*/}
        </p>
        <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
          <FaMapMarkerAlt className='text-green-700' />  {/* Display the address of the listing, alongside a map marker icon*/}
          {listing.address}
        </p>
        <div className='flex gap-4'>
          <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}         {/*If the listing type is 'rent', show 'For Rent'; otherwise, show 'For Sale*/}
          </p>
          {listing.offer && (                // Display only if there's an offer on the listing.
            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
              ${+listing.regularPrice - +listing.discountPrice}      {/* Show the discounted price difference between regular and discounted prices in US dollars*/}
            </p>
          )}
          </div>
          <p className='text-slate-800'>
            <span className='font-semibold text-black'>Description :- </span>
            {listing.description}             {/* Display the description of the listing*/}
          </p>
          <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg' />        {/*Display the number of bedrooms with a bed icon*/}
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}  {/*If there's more than one bedroom, pluralize 'Beds'; otherwise, use 'Bed'*/}
              </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}     {/*If there's more than one bathroom, pluralize 'baths'; otherwise, use 'bath'*/}
              </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaUtensils className='text-lg' />
                {listing.kitchens > 1 ? `${listing.kitchens} Kitchens` : `${listing.kitchens} Kitchen`}   {/*If there's more than one kitchen, pluralize 'Kitchens'; otherwise, use 'kitchen'*/}
              </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaTv className='text-lg' />
                {listing.livingrooms > 1 ? `${listing.livingrooms} Living Rooms` : `${listing.livingrooms} Living Room`}   {/*If there's more than one livingrooms, pluralize 'livingrooms'; otherwise, use 'livingroom'*/}
              </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No parking'}           {/*Display a parking icon whether parking is available or not*/}
              </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}    {/*Display a chair icon whether the listing is furnished or unfurnished*/}
           </li>
          </ul>
          {currentUser && listing.userRef !== currentUser._id && !contact &&(                    // Render a button to contact the landlord if there is a current user,the listing's user reference is not the same as the current user's ID,,and the contact state is false.,// if there is a current user or person is the owner (&&) and if there is listing, and then if the listing that user ref is not equal to the other people than the owner of the listing can see it.so if this one is equal to currentUser._id, and then we want to see the button
          <button onClick={()=> setContact(true)}  className='bg-orange-700 text-white rounded-lg uppercase hover:bg-black p-3'>Contact landlord</button>    // When clicked, it sets the contact state to true// if setContact is true, dont show this button, or if setContact  is true !contact is going to be false. so we cannot see the button, After clicking on the button it is going to be disappeared
          )}
          {contact && <Contact listing={listing}/> }     {/* Render the Contact component if the contact state is true,and passing the listing as a prop.*/}
      </div>
      </div>
    }
    </main>
  );
}
