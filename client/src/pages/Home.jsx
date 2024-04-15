import { useEffect, useState } from 'react';                                     //Importing useEffect is used to carry out side operations in functional components, including data fetching, and  useState hook adds state to functional components so they may update and manage their own state.
import { Link } from 'react-router-dom';                                          // Importing the Link component to create navigation links.
import ListingItem from '../components/ListingItem';                              //Importing a custom component that handles the rendering of each listing item.
import { FaFacebook,FaInstagram, FaTwitter, FaYoutube  } from 'react-icons/fa';    // Importing icons from Font Awesome

export default function Home() {
const [offerListings, setOfferListings] = useState([]);               //adding state  variable for offer listings ,/ all state variables defined using the useState hook to manage different types of listings like offer, sale, and rent
const [saleListings, setsaleListings] = useState([]);                 //adding state  variable for sale listings
const [rentListings, setrentListings] = useState([]);                 //adding state  variable for rent listings


useEffect(() => {
const fetchOfferListings = async() => {                                 // Function to fetch offer listings from the API
  try{
    const res = await fetch('/api/listing/get?offer=true&limit=4');      //fetch offer listings data from the API and add query which is offer should be true and limit to 4 listing
    const data = await res.json();                                       // After getting response,convert it to json
    setOfferListings(data);                                              // Update offer listings state with fetched data
    fetchRentListings();                                                 // we want to get the rent listing data after the offer one by one because it prevents from requesting for all, by adding this it will request one by one in sequence./Fetch rent listings after fetching offer listings
  }catch (error){
    console.log(error);                                                 //beacause we dont want to show the error to users
  }
};
const fetchRentListings = async() => {                                   //Call this function after the offer data, Until the offer data is not loaded or response didn't come, it will not call this function, or it will not fetch data fo rent, so it will loaded better.// Fetch rent listings data from the API after offer data is loaded
  try{
    const res = await fetch('/api/listing/get?type=sale&limit=4');       //fetch listing data and add query which is type should be rent and limit to 4 listing
    const data = await res.json();
    setrentListings(data);                                              // Update rent listings state with fetched data
    fetchSaleListings();                                                // Fetch sale listings after fetching rent listings
  }catch (error){
    console.log(error);
  }
};
const fetchSaleListings = async() => {                               // Function to fetch sale listings data from the API
  try{
    const res = await fetch('/api/listing/get?type=sale&limit=4');                           // Fetch sale listings data from the API with a query parameter specifying type as sale and limit as 4
    const data = await res.json();                                   // Extract JSON data from the response
    setsaleListings(data);                                          // Update sale listings state with fetched data
  }catch (error){
    console.log(error);
  }
};
fetchOfferListings();                                   //Call the fetchOfferListings function when the component initializes
}, []);                                                 // run this function only once when the page is loaded./During initial render, the useEffect is set to execute only once by passing in an empty dependency array






  return (
    <div>
      {/* explore content */}
      <div className='flex flex-col gap-6 p-28 px-12 max-w-8x' style={{backgroundImage: 'url("https://wallpapers.com/images/hd/real-estate-digital-art-0kmi22tcj2x60lim.jpg")'}}>
        <h1 className='text-black font-bold text-3xl lg:text-6xl'>
          Explore,
          <br/>
          Discover, and Invest!
        </h1>
        <div className='text-white text-xs sm:text-sm'>
        Epic Homes is the best place to discover your next perfect place.
          <br/>
          You have the option of choosing from a variety of properties that we provide.
        </div>
        <Link to={"/search"} className='text-orange-700 text-xl font-bold hover:underline'>
          Explore Now &#8594;
        </Link>
      </div>


      {/*Listing */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-7'>
        { offerListings && offerListings.length > 0 && (                                 //if there is offerlistings and length of offerlisting is more than 0 show listing,,/renders a section for displaying recent places for rent if there are rentListings available and the length of rentListings is greater than 0
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-orange-700'>Recent Offers</h2>
              <Link className='text-sm hover:underline' to={'/search?offer=true'}>Show more offers</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {offerListings.map((listing) => (                                  //to get all listings,// Map over offerListings array and render ListingItem for each item,,/ it maps over the rentListings array using the map function and renders a ListingItem component for each listing, passing the listing data and a unique key as props, The ListingItem component is responsible for rendering individual listing items.
                  <ListingItem listing={listing} key={listing._id} />
                  ))}
              </div>
          </div>
        )
        }
        
      
        { rentListings && rentListings.length > 0 && (                                   // Check if rentListings is not null and has items
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-orange-700'>Recent places for rent</h2>
              <Link className='text-sm hover:underline' to={'/search?type=rent'}>Show more rent</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {rentListings.map((listing) => (                             // Map over rentListings array and render ListingItem for each item
                  <ListingItem listing={listing} key={listing._id} />
                  ))}
              </div>
          </div>
        )
        }
        
      
        { saleListings && saleListings.length > 0 && (                                     // Check if saleListings is not null and has items
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-orange-700'>Recent places for sale</h2>
              <Link className='text-sm hover:underline' to={'/search?offer=true'}>Show more sale</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />                              //it maps over the saleListings array using the map function and renders a ListingItem component for each listing, passing the listing data and a unique key as props,The ListingItem component is responsible for rendering individual listing items
                  ))}
              </div>
          </div>
        )
        }
        
        {/*Footer */}
      </div>
      <div className="bg-slate-200 text-black py-2 p-2">
      <div>
            <p className="flex justify-center text-center font-bold mt-2 gap-4">
                Copyright &copy; 2024 - Epic Homes | All Rights Reserved  |  <span className='gap-7'> </span>
                <span className='gap-10'> Contact us - </span>
                <FaFacebook />
                <FaInstagram />
                <FaYoutube />
                <FaTwitter />
            </p>
        </div>
            <hr className="my-2"/>
            <div>
              <p className='text-sm px-6 mb-4'> <span className='font-bold'>Notice: </span> You acknowledge and accept that Epic-Homes is not associated with to any of the transactions involving the products or services that are mentioned on the website. It is only a platform for sharing information about properties among developers, brokers, and owners. Epic-Homes does not hold any responsibility for their act in any circumstances.It is only a web-based application designed to exchange information about properties.</p>
            </div>
        </div>

</div>
   
  );
}
