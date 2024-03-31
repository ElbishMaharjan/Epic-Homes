import { useState } from "react";               // Import the useState hook from React for managing state
import { useDispatch, useSelector } from "react-redux";      // Import the useDispatch and useSelector hooks from React Redux for dispatching actions and accessing the Redux store state 
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from "../redux/user/userSlice";   // Import action creators from the userSlice for updating user information, deleting user account, and signing out
import { Link } from 'react-router-dom';    // Import the Link component from React Router for navigation

// Profile component displays user profile information
export default function Profile() {
  const {currentUser, loading, error } = useSelector((state) => state.user);  // Select relevant state from Redux store
  const [formData, setFormData] = useState({});  // Initialize state for form data 
  const [updateSuccess, setUpdateSuccess] = useState(false);     // Initialize state for update success status
  const dispatch = useDispatch();                    // Initialize useDispatch hook to dispatch actions


// Define a function to handle changes in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });  // Update the formData state by spreading the existing formData and updating the value corresponding to the input field's ID
  };

   // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();         // Prevent the default form submission behavior
    try{
      dispatch(updateUserStart());   // Dispatch action to indicate update process has started
      const res = await fetch(`/api/user/update/${currentUser._id}`,{  // Perform update operation by creating response using fetch method and the endpoint is API/
        method: 'POST',                    // Use the POST method for updating user data
        headers: {
          'Content-Type': 'application/json',      // Set the content type header to JSON
        },
        body:JSON.stringify(formData),   // Convert the form data to JSON and send it in the request body,//we save everything inside formdata,
      });
      const data = await res.json();  //we want to get data by converting it to using the JSON and then 
      if (data.success === false) {    // Check if update was unsuccessful,if data is incorrect
        dispatch(updateUserFailure(data.message));  // Dispatch action to handle update failure,send error message
        return;
      }
       // If the update was successful, dispatch an action to handle the success
      dispatch(updateUserSuccess(data));    // Dispatch action to handle update success with the updated user data
      setUpdateSuccess(true);               // Update local state to indicate that the update was successful
      
    } catch (error) {
      dispatch(updateUserFailure(error.message));   // If an error occurs during the update process, dispatch an action to handle the failure with the error message
    }
  };

  // Define a function to handle the deletion of the user account, This function is triggered when the user clicks on the "Delete account" span element
const handleDeleteUser = async () => {
  try {
    dispatch(deleteUserStart());       // Dispatch an action to indicate the start of the user deletion process
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {    // Send a DELETE request to the server to delete the user account
      method: 'DELETE',  // Use the DELETE method for deletion
    });
    const data = await res.json(); // Parse the JSON response from the server
    if (data.success === false){     // If the deletion was not successful, dispatch an action to handle the failure
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));     // If the deletion was successful, dispatch an action to handle the success
  } catch (error) {
    dispatch(deleteUserFailure(error.message))  // If an error occurs during the deletion process, dispatch an action to handle the failure
  }
};

// Define a function to handle the sign-out 
const handleSignOut = async() => {
  try{
    dispatch(signOutUserStart());                   // Dispatch an action to indicate that the sign-out process has started
    const res = await fetch('/api/auth/signout');   // Send a request to the server to sign out the user
    const data = await res.json();                  //we want to get data by converting it to using the JSON and then 
    if (data.success === false){                    // If sign-out was not successful, dispatch an action to handle the failure
      dispatch(signOutUserFailure(data.message));    // Dispatch action to handle sign-out failure with the error message
      return;
    }
    // If sign-out was successful, dispatch an action to handle the success
    dispatch(signOutUserSuccess(data));// Dispatch action to handle sign-out success
   } catch (error){
    dispatch(signOutUserFailure(error.message)); // If an error occurs during the sign-out process, dispatch an action to handle the failure with the error message
  }
};




  // Render the component
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4"> {/* Render a form element that triggers the handleSubmit function when submitted.,Form for updating user profile */}

        <img src ={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />   {/* Display user avatar */}
         {/* Input fields for username, email, and password */}
        <input type="text" placeholder="username" id="username" defaultValue={currentUser.username} className="border p-3 rounded-lg"   onChange={handleChange}/> {/*defaultvalue show the user information in proile page */}
        <input type="email" placeholder="email" id="email" defaultValue={currentUser.email} className="border p-3 rounded-lg" onChange={handleChange} />  {/* onChange: Event handler function called when the input value changes, invoking the handleChange function */}
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" onChange={handleChange} />{/*add onchange event listener */}

        <button  disabled={loading} className="bg-orange-600 text-white rounded-lg p-3 uppercase hover:bg-black ">{loading ? 'loading...' : 'Update' }</button> {/* Button for updating user profile, if the loading is true,we want to see loading..., otherwise we want to see updates, and when it is loading... the loading button is disabled */}
        <Link  className= 'bg-black text-white p-3 rounded-lg uppercase text-center hover:opacity-80'to ={"/create-listing"}>           {/* Render a Link component for navigating to the Create Listing page. The 'to' prop specifies the destination route ("/create-listing").*/}
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5"> {/* Section for account deletion and sign out */}
        <span onClick={handleDeleteUser}  className=" bg-red-700 text-white p-1 rounded-lg text-center cursor-pointer text-1xl font-semibold hover:opacity-80 ">Delete account</span> {/* Render a clickable span element to handle the deletion of the user account.When clicked, it triggers the handleDeleteUser function.*/}
        
        <span onClick={handleSignOut}className=" bg-red-700 text-white p-1 rounded-lg text-center text-red-700 cursor-pointer text-1xl font-semibold hover:opacity-80 ">Sign out</span>{/* Render a clickable span element to handle the sign-out action. When clicked, it triggers the handleSignOut function.*/}
      </div>


      <p className="text-red-700 mt-5">{error ? error : ''} </p>{/* Conditional rendering of a paragraph element. If 'error' exists, display the error message.Otherwise, render an empty string. */}
      <p className="text-green-700 mt-5"> {updateSuccess ? 'User is updated successfully' : ''}</p> {/* Conditional rendering of a paragraph element.If updateSuccess is true, display the success message.Otherwise, render an empty string. */}
    </div>
  )
}
