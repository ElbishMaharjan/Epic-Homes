import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';              // Import the ListingItem component

export default function Search() {                                 // Declare a function component named Search that we can use elsewhere
    const navigate = useNavigate();                                //initlize navigate
    const [sidebardata, setSidebardata] = useState({              //adding piece of state with function setsidebardata and creating default initial value
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });

    const [loading, setLoading] = useState(false);                     // Declare a state variable named loading and its setter function setLoading to keep track of whether data is currently being loaded,Initially, loading is set to false because no data is being loaded
    const [listings, setListings] = useState([]);                      // Declare a state variable named listings and its setter function setListings to store the fetched data, initialize listings as an empty array, which will hold the fetched data
    const [showMore, setShowMore] = useState(false);                   // Initialize or create state for controlling whether to show more content or not

    useEffect(() => {                                                    // useEffect hook to perform side effects when the component fetch or location.search changes
        const urlParams = new URLSearchParams(location.search);          //first getting the information from url,searchtermurl is urlparams from above line and get the searchterm from there,Create a URLSearchParams object to extract query parameters from the current URL's
        const searchTermFromUrl = urlParams.get('searchTerm');           //set a new data, // get the value of the 'searchTerm' parameter from the URL query string, retrieving each query parameter value from the URL using the get method of the URLSearchParams object
        const typeFromUrl = urlParams.get('type');                       //get the type
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(                                                            // Once we get all of them, Check if in any situation,like if there is search term or type or ...,// Check if any of the URL query parameters have a value,This conditional statement checks whether any of the URL query parameters (searchTerm,..) have a non-empty value.
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {                                                               // if there is any changes  set in setsidebardata,      If any of the parameters have a value the following code will be executed,/It uses values retrieved from the URL query parameters to set these properties. If a parameter is not available in the URL, default values are used
            setSidebardata({
                searchTerm: searchTermFromUrl || '',                       // if there is change in search, searchterm equal to searchTermFromUrl, in case there is problem add empty string,Set `searchTerm` to the value from the URL or an empty string if it's not available
                type: typeFromUrl || 'all',                                    // Set `type` to the value from the URL or 'all' if it's not available
                parking: parkingFromUrl === 'true' ? true : false,            // Convert the string value to a boolean for `parking
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',                            // Set `sort` to the value from the URL or 'created_at' if it's not available
                order: orderFromUrl || 'desc',                                  // Set `order` to the value from the URL or 'desc' if it's not available
            });
        }
                                                                        //Based on the infromation we have, we want to fetch data from database and show the result in website, useEffect is already called
        // Define an asynchronous function to fetch listings data                                     
        const fetchListings = async () => {
            setLoading(true);                                                 // Set loading state to true to indicate data fetching is in progress
            const searchQuery = urlParams.toString();                         // we want to get the updated URL, and get response based on the search query, the one after from usEffect(urlprams) then convert to string
            const res = await fetch(`/api/listing/get?${searchQuery}`);        // using getListing function, and add the searchQuery to the end of the url,    fetches data from an API endpoint using the query string
            const data = await res.json();                                     //after geting data back convert into json format so we can use it
            if (data.length > 9 ){                                             // If the length of the data array is greater than 9, set showMore state to true
                setShowMore(true);
            }
            else{
                setShowMore(false);                                               // Otherwise,, set showMore state to false
            }
            setListings(data);                                                 // Update the listings state with the fetched data
            setLoading(false);                                                // Set loading state to false after data fetching is complete                   
        };

        fetchListings();                                                      // Call the fetchListings function

    }, [location.search]);                                       // if location.search changes we want to change the sidebardata,  // The useEffect hook has `location.search` in its dependency array, so it runs whenever `location.search` changes      


    const handleChange = (e) => {                                                         //function listens for change events (onChange) on input elements and responds accordingly
                                                                                          //So there are some conditions because the inputs are different, sometimes like boolean, text

        if(e.target.id === 'all' || e.target.id === 'rent'|| e.target.id === 'sale') {
            setSidebardata({...sidebardata, type: e.target.id});                            // if it is all, rent or sale, we set the sidebardat, and keep the previous information, and change the type  according to e.target.id,,// If the target element's ID is 'all', 'rent', or 'sale', update the 'type' property of sidebardata with the ID of the target element
        }

        if (e.target.id === 'searchTerm') {                                                //if the e.target.id is searchterm, we want to just change the searchterm,, // If the target element's ID is 'searchTerm', update the 'searchTerm' property of sidebardata with the new value entered in the input field
            setSidebardata({...sidebardata, searchTerm: e.target.value});                   //set sidebardata and keep previous, and then search term is going to be e.target.value
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false, });  //set data,keep information and cndition = e.target.id, whatever id is this is going to be checked, checking if first e.target.checked is true like Boolean true or e.target.checked is equal to a string true, so its going to be true,otherwise in any other case, its going to be false,/ // If the target element's ID is 'parking', 'furnished', or 'offer', update the respective property of sidebardata, / Update the property based on whether the checkbox is checked or not
        }


        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';                                 //first get the sort,  we have two things together, created_at_desc  which need to be split,splited the first value by underline'_',  first calue is going to be sort, if there is no first value, just say 'created_at',/// Split the value of the target element by underscore and extract the sort and order values, // Default to 'created_at' if sort value is not provided

            const order = e.target.value.split('_')[1] || 'desc';                                    // second is order,split the second, if there is nothing we get descenfing

            setSidebardata({...sidebardata, sort, order});                                       // Update the sidebardata ,keeping previous info and add or with new sort and order values to that informayion
        }
    };

                                               // Change the URL based on the information of form, when clicking the search button, after clicking search button submit the form and change the URL with this only search area and URL are changed not in the form  to change in all 3 useEffect is used
    const handleSubmit = (e) => {
        e.preventDefault();                               // Prevents the default form submission behavior, which would cause a page reload          

        const urlParams = new URLSearchParams();                        //geting the information already we have inside the URL, then get the URL params using method called URL search params which need to be called,// Create a new URLSearchParams object to store the query parameters
        urlParams.set('searchTerm', sidebardata.searchTerm);           //set the searchterm to the sidebardata.searchterm,/// Set each query parameter using the corresponding value from the sidebardata object
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking.toString());         // Convert the boolean value of 'parking' to a string
        urlParams.set('furnished', sidebardata.furnished.toString());
        urlParams.set('offer', sidebardata.offer.toString());
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();                     // want to get the search query by converting to string,/// Convert the URLSearchParams object to a string representation of the query parameters
        navigate(`/search?${searchQuery}`);                        // navigate user to /search with searchQuery
    };

    const onShowMoreClick = async () => {                            // Define an asynchronous function to handle the "Show more" button click event
        const numberOfListings = listings.length;                     // we dont want to fetch the data from index zero, we want to fetch after the data we already we have which is 10 listings, first counting the length of listing which is 10, and it will start to fetch from 11 to 20,// Get the total number of listings
        const startIndex = numberOfListings;                           // Set the start index for fetching more listings
        const urlParams = new URLSearchParams(location.search);       //Based on the previous params we fetch data from url,/ Create a new URLSearchParams object by parsing the query parameters from the current URL's search portion
        urlParams.set('startIndex', startIndex);                      //adding index to url, set the 'startIndex' query parameter to the startIndex value obtained from the listings from above
        const searchQuery = urlParams.toString();                     // we want to create a search query,/ Convert the URLSearchParams object to a string format containing query parameters
        const res = await fetch(`/api/listing/get?${searchQuery}`);   //fetch the data from and pass searchQuery,/ Fetch listings data from the server using the constructed search query
        const data = await res.json();                                // convert data to json
        if (data.length < 10 ){                                       //if the listing is less than 10 then dont want to show the show more button
            setShowMore(false);
        }
        setListings([...listings, ...data]);                          //keeping the previous listings and adding the new listing,// Combine the existing listings with the newly fetched data and update the listings
    };

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>   {/* adding onSubmit event listener,once we submit the form by cliking on search, call a function handleSubmit*/}
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text' id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full'  value={sidebardata.searchTerm} onChange={handleChange} />      { /* Setting the value to be sidebardata.searchTerm,and adding unchanged event listener, which is going to call that handle change function */}
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sidebardata.type === 'all'}  />                                                 {/*adding onchanged event listener, we want to make checked both rent and sale as defaultand initial value is 'all',/The checked attribute is set based on whether the value of `sidebardata.type` is 'all'  */}
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={sidebardata.type === 'rent'}/>                                                 {/*Onchanged event listener which is going to call handle change, its also going to be checked if sidebardata.type is equal to rent*/}
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={sidebardata.type === 'sale'}/>                                                  {/*  The onChange event is handled by the handleChange function, The checked attribute is set based on whether the value of `sidebardata.type` is 'sale'*/}
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={sidebardata.offer}/>                                                        {/*Onchanged event listener which is going to call handle change, its also going to be checked if sidebardata.offer is true*/}
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Facilities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={sidebardata.parking} />                                                   {/*onchanged event listener which is going to call handle change, its also going to be checked if sidebardata.parking is true*/}
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={sidebardata.furnished}/>                                                {/*onchanged event listener which is going to call handle change, its also going to be checked if sidebardata.furnished is true*/}
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Sort:</label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'}  id='sort_order' className='border rounded-lg p-3'>                                           {/*Unchanged event listener which is going to call handle change, and set default value to 'created_at_desc'*/}
                        <option value='regularPrice_desc' >Price high to low</option>                                                                                             {/*adding value at regular price, not adding discount price because sometimes we dont have offer*/}
                        <option value='regularPrice_asc' >Price low to high</option>
                        <option value='createdAt_desc' >Latest</option>
                        <option value='createdAt_asc' >Oldest</option>
                    </select>
                </div>
                <button className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:bg-black transition duration-300 '>Search</button>
            </form>
        </div>

        <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-black mt-5' >Listing results:</h1>
        
        <div className='p-7 flex flex-wrap gap-4' > 
                                                                                   {/*Conditional rendering based on loading state and listings length*/}
            {!loading && listings.length === 0 && (                                //if there is no loading and listing display no listing found
                <p className='text-xl text-orange-700'> No listing found!</p>
            )}

            {loading && (                                                                         //if there is loading display loading
                <p className='text-xl text-orange-700 text-center w-full'>Loading...</p>
            )}
                                                                                                    {/*Conditional rendering based on loading state and presence of listings*/}
                {!loading && listings && listings.map((listing) => (                               //if there is no loading and listing exists then map through the listing and get each listing
                        <ListingItem key={listing._id} listing={listing} />                        // Map over the listings array and render a component for each item ,//{listing} to get this listing inside the ListingItem as the input
                    ))}

            {showMore && (      //   if the showMore state is true, // Render the "Show more" button
                <button onClick={onShowMoreClick} className='text-orange-700 hover:underline p-7 text-center w-full'>Show more</button>
            )}
        </div>

        </div>
    </div>
  );
}
