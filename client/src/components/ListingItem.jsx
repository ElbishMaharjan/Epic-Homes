import { Link } from 'react-router-dom';                             // Import Link component from 'react-router-dom' for navigation within the application
import {MdLocationOn } from 'react-icons/md';                        // Import MdLocationOn icon from 'react-icons/md' for location indication
import PropTypes from 'prop-types';                                   // Import PropTypes for defining prop types and performing props validation

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]'>
        <Link to= {`/listing/${listing._id}`}>                                                                                 {/* Create a link to the listing detail page */}
            <img src={listing.imageUrls[0] } alt='listing-cover'                                                              // Display the first image of the listing                                                   
             className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
        
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-orange-700'>{listing.name}</p>                        {/* Display the listing name */}
                <div className='flex items-center gap-1'> 
                    <MdLocationOn className= 'h-4 w-4 text-green-700 '/>
                    <p className='text-sm text-gray-600 truncate w-full' >{listing.address}</p>                         {/* Display the location icon and address */}
                </div>
                <p className='text-sm text-gray-600 truncate'>{listing.description}</p>                                  {/* Display the llisting description*/}
                <p className='text-slate-500 mt-2 font-semibold'>
                  {/* For Displaying the price */}
                $ {listing.offer && listing.discountPrice ?                            // Check if there's an offer and a discounted price
                 listing.discountPrice.toLocaleString('en-US')                  // If both conditions are true, display the discounted price
                 : listing.regularPrice ? listing.regularPrice.toLocaleString('en-US') : 'N/A'}  {/*If there's no discounted price, check if there's a regular price,  // If there's a regular price, display regular price, and If there's no regular price, display 'N/A'          */}
                 
                 {listing.type === 'rent' && '/ Month'}                                 {/* If the listing type is 'rent', append '/ Month' */}
                </p>
                <div className='text-slate-700 flex gap-4'> 
                    <div className='font-bold text-xs'>                                                                {/* Display the number of bedrooms */}
                        {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed `}                        {/* Check if there are multiple bedrooms */}
                    </div>
                    <div className='font-bold text-xs'>                                                                        {/* Display the number of bathrooms */}
                        {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath `}                   {/* Check if there are multiple bathrooms */}
                    </div>
                </div>
            </div>
        </Link>
    </div>
  );
}
ListingItem.propTypes = {
    listing: PropTypes.shape({
      _id: PropTypes.string.isRequired,               // Unique identifier for the listing
      imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,// Array of image URLs for the listing
      name: PropTypes.string.isRequired,              // Name of the listing
      address: PropTypes.string.isRequired,            // Address of the listing
      description: PropTypes.string.isRequired,         // Description of the listing
      offer: PropTypes.bool.isRequired,                  // Indicates whether there is an offer for the listing
      discountPrice: PropTypes.number,                    // Discounted price of the listing (optional if there's an offer)
      regularPrice: PropTypes.number.isRequired,           // Regular price of the listing
      type: PropTypes.oneOf(['sale', 'rent']).isRequired,   // Type of the listing (sale or rent)
      bedrooms: PropTypes.number.isRequired,                // Number of bedrooms in the listing
      bathrooms: PropTypes.number.isRequired,               // Number of bathrooms in the listing
    }).isRequired,
  };




  //PropTypes are used in React to specify the expected data type for props passed to a component.
  //PropTypes help ensure that components receive the correct data types for their props, preventing runtime errors due to incorrect data
  //PropTypes serve as documentation for components, making it clear what props they expect and what data types are valid.
  // PropTypes can help identify issues during development by providing warnings in the console when props don't match the specified types.