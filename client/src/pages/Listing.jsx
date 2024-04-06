import  { useEffect, useState } from 'react';   // Importing useEffect and useState hooks from React
import { useParams } from 'react-router-dom';   // Importing useParams hook from React Router DOM
import { Swiper,  SwiperSlide } from 'swiper/react';   // Importing Swiper and SwiperSlide components from Swiper React
import SwiperCore from  'swiper';                  // Importing the main SwiperCore module from Swiper
import { Navigation } from  'swiper/modules';      // Importing the Navigation module from Swiper
import 'swiper/css/bundle';                       // Importing Swiper CSS bundle


// Define the Listing component
export default function Listing() {
  SwiperCore.use([Navigation]);                  // Install the Navigation module for the Swiper component
    const [listing, setListing] = useState(null);        // Define a state variable 'listing' and a function 'setListing' to update it
    const params = useParams();    // Extract the URL parameters using the useParams hook from React Router

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
      </div>
}
    </main>
  );
}
