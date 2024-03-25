import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';  //importing function

// Component for Sign In
export default function SignIn() {
  const [formData, setFormData] = useState({});   // creating object and function setformdata, import usestate,allowing you to store and update data, keep track of all data.
  const { loading, error } = useSelector((state) => state.user);           // Selecting loading and error state from Redux store
  const navigate = useNavigate();           // Navigate hook for programmatic navigation
  const dispatch = useDispatch();           // Dispatch function for Redux actions
   // Function to handle form input change
  const handleChange = (e) => {            //  event listener call function handlechange, and e-take an event
    setFormData(        
      {
        ...formData, //help ko keep previous data by using spread operator(...)
        [e.target.id]: e.target.value, //add new changes with the help of id and what ever is change set that value
      });
  };
  const handleSubmit = async(e) => {      // Function to handle form submission //creating functiom
    e.preventDefault();                //to prevent the refreshing when we submit the form
    try {
      dispatch(signInStart());       // Dispatching sign-in start action
    const res = await fetch('/api/auth/signin',     // get response by fetching in this url
    {
      method: 'POST',       //adding object
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),    //send the body from the browser and send this (formdata)
    });
    const data = await res.json();        //change and convert response we get to JSON so we can use it and see it.
    console.log(data);         // if user is new and enters correct information "user created sucessfully" is dispalyed
    if (data.success === false){   //if there is error
      dispatch(signInFailure(data.message)); // Dispatching sign-in failure action
      return;
    }
    dispatch(signInSuccess(data));        // Dispatching sign-in success action
    navigate('/');              // Redirecting to home page
    } catch(error){
      dispatch(signInFailure(error.message));       // Dispatching sign-in failure action if an error occurs
    }
  };

  // Rendering the sign-in form
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text text-center font-semibold my-7'>Sign In</h1>
    <form onSubmit= {handleSubmit} className='flex flex-col gap-4'>    
      
      <input type = "email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
      <input type = "password" placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange} />

      <button disabled = {loading} className='bg-orange-600 text-white p-3 rounded-lg uppercase hover:bg-black   opacity-85 disabled:opacity-80'>{loading ? 'Loading...': 'sign In'}</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Dont have an account?</p>
      <Link to={'/sign-up'}> 
      <span className='text-blue-700'>Sign up</span>
      </Link>

    </div>
    {(error) && <p className='text-orange-600 mt-5'>{error}</p>}
    </div>
  );
  
}
