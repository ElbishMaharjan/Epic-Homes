import  { useEffect, useState } from 'react';    // Import useEffect and useState hooks from React for managing component state
import { Link } from 'react-router-dom';        // Import Link component from 'react-router-dom' for navigation within the application
import PropTypes from 'prop-types';             // Import PropTypes for defining prop types and performing props validation


export default function Contact({ listing}) {                  // Define a functional component named Contact, accepting 'listing' as a prop
    const [landlord, setLandlord] = useState(null);            // Initialize state variables 'landlord' and 'message' using the useState hook
    const [message, setMessage] = useState('');                 // setting 'landlord' to null initially and 'message' to an empty string


    const onChange = (e) => {             // Define an onChange event handler function to update the 'message' state
        setMessage(e.target.value);        // based on the value entered in the input field
    };



    useEffect(() => {                               // Use the useEffect hook to fetch landlord data when the 'listing.userRef' changes
        const fetchLandlord = async ()=> {           // Define an asynchronous function to fetch landlord data
            try{
                const res = await fetch(`/api/user/${listing.userRef}`);        // Fetch user data from the server using the 'listing.userRef' value
                const data = await  res.json();     // converting response as JSON
                setLandlord(data);                  // Update the 'landlord' state with the fetched data
            } 
            catch (error) {
                console.log(error);               // Log any errors to the console
            }
        };
         fetchLandlord();                 // Call the fetchLandlord function when 'listing.userRef' changes
    }, [listing.userRef]);                // Depend on 'listing.userRef' to trigger the effect when it changes


// Render the Contact component only if 'landlord' data is available
return (
    <>
    {landlord && (                                // Display a container to contact the landlord
        <div className='flex flex-col gap-2'>
            <p>
                Contact <span className='font-semibold'>{landlord.username}</span>{''} for {''}
                <span className='font-semibold'>{listing.name.toLowerCase()}</span>
            </p>
            <textarea name='message' id='message' rows='2' value={message} onChange={onChange} placeholder='Enter your message here...' className='w-full border p-3 rounded-lg' ></textarea>  {/* Textarea for entering the message */}

            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-orange-700 text-white text-center p-3 uppercase rounded-lg hover:bg-black'>    {/* Create a link to compose an email with the landlord's email address pre-filled as the recipient,the subject including the listing name, and the body including the message.,mailto is going to activate your mail system in the windows,send the email of the landlord, the subject of the emailand body with message*/}
            Send Message
            </Link>
        </div>
    )};
    </>
  );
}

// Define prop types validation for the Contact component
Contact.propTypes = {
    listing: PropTypes.shape({     // Ensure that the 'listing' prop is provided and has the required shape
        userRef: PropTypes.string.isRequired,           // containing 'userRef' and 'name' properties, both of which are strings
        name: PropTypes.string.isRequired,
    }).isRequired,
};