import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react';


export default function Header() {
    const { currentUser} = useSelector(state => state.user)        // Access or initial current user information from Redux store,& because the name of our state is user in userslice.
    const [searchTerm, setSearchTerm] =useState('');               // State variable to hold the search term entered by the user
    const navigate = useNavigate();                                 // Hook from React Router to get the navigate function, which allows navigation
    

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();                                               // Prevents the default form submission behavior, which would cause a page reload
                                                                          // After searching one thing, wa want to keep the previous queries, we dont want to delete them so in order to get this infromation we an use a method in react, built-in called JavaScript constructor called URL search params.
        const urlParams = new URLSearchParams(window.location.search);     //So we can get the URL data, once we have all infomation,   // Extract query parameters from the current window's URL search string
        urlParams.set('searchTerm', searchTerm);                           //we want to change its search term because we want to change the searchTerm(from form-line43) to this here searchTerm, urlparams. whatever we have previously, we want to set this 'searchTerm', to the searchTerm we are subitting that are changing inside (const [searchTerm above]), //Set the 'searchTerm' parameter in the URL query string to the value of the searchTerm state variable
        const searchQuery = urlParams.toString();                           // first we wanna get all the url, the search query and then convert this url prams and new one to the string because some of them is number and other and then navigate, // Convert the URLSearchParams object to a string representation of the query parameters
        navigate(`/search?${searchQuery}`)                                  //navigate to search and then with all these search queries that we have,  // Navigate to the '/search' route with the constructed query string appended 
    };

    useEffect(() => {                                                //use of useEffect beacuse each time there is change in url we want to change in inside search area,// useEffect hook to handle side effects when the component mounts or when the location.search property changes
        const urlParams= new URLSearchParams(location.search);       // Create a new URLSearchParams object to extract query parameters from the current URL's search string
        const searchTermFromUrl =  urlParams.get("searchTerm");       // fetch the value of the 'searchTerm' parameter from the URL query string
        if (searchTermFromUrl) {                                      //if there is a searchterm from url,                // If there is a search term from the URL, set the searchTerm state to that value
            setSearchTerm(searchTermFromUrl);                         //we want to set the search term to that one
        }
    }, [location.search]);                                                           // Dependency array ensures the effect runs only once, on component initializes            


  return (
    <header className='bg-black shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
            <Link to='/'>
                <h1 className='font-bold text-sm:text-xl flex-wrap'>
                    <span className='text-orange-600'>EpicHouse</span> 
                    <span className='text-orange-600'>Estate</span>
                </h1>
            </Link>
            <form  onSubmit={handleSubmit}  className='bg-slate-100 p-1 rounded-lg flex items-center'> {/*  Form for submitting search queries. - onSubmit: Calls the handleSubmit function when the form is submitted */}
                <input type='text' placeholder='Search...'
                className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />  {/*  value: Binds the value of the input field to the searchTerm state, - onChange: Updates the searchTerm state when the input value changes */}
               <button>
               <FaSearch className='text-slate-600'/>  {/* Button , and click on icon for submitting the search query. */}
               </button>
            </form>

            <ul className='flex gap-4'>
            <Link to='/'>
                <li className='hidden sm:inline text-slate-100 hover:underline decoration-orange-700 decoration-2'> Home</li>
            </Link>
            <Link to='/about'>
                <li className='hidden sm:inline text-slate-100 hover:underline decoration-orange-700 decoration-2'>About</li>
            </Link>
            <Link to='/profile'>  {/* Profile link or Sign-in link based on user authentication */}
                {currentUser ? (  // if the current user exixts,we want to show an image or avatar, otherwise we wanna see the sign in li
                    <img className='rounded-full h-7 w-7 object-cover'  src={currentUser.avatar} alt="profile" />
                ) : (
                    <li className=' text-slate-100 hover:underline decoration-orange-700 decoration-2'>Sign-in</li>
                )}
                
            </Link>
            </ul>
        </div>
    </header>
  )
}
