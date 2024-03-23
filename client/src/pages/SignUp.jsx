import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({});   // creating object and function setformdata, import usestate,allowing you to store and update data, keep track of all data.
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {            //  event listener call function handlechange, and e-take an event
    setFormData(        
      {
        ...formData, //help ko keep previous data by using spread operator(...)
        [e.target.id]: e.target.value, //add new changes with the help of id and what ever is change set that value
      });
  };
  const handleSubmit = async(e) => {       //creating functiom
    e.preventDefault();                //to prevent the refreshing when we submit the form
    try {
      setLoading(true);
    const res = await fetch('/api/auth/signup',     // get response by fetching in this url
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
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);        // if there is no loading stop and navigate to the sign-in page
    setError(null);
    navigate('/sign-in');
    } catch(error){
      setLoading(false);
      setError(error.message);
    }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text text-center font-semibold my-7'>Sign Up</h1>
    <form onSubmit= {handleSubmit} className='flex flex-col gap-4'>    
      <input type = "text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/> 
      <input type = "email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
      <input type = "password" placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange} />

      <button disabled = {loading} className='bg-orange-600 text-white p-3 rounded-lg uppercase hover:bg-black   opacity-85 disabled:opacity-80'>{loading ? 'Loading...': 'sign Up'}</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Do you Have an account?</p>
      <Link to={'/sign-in'}> 
      <span className='text-blue-700'>Sign in</span>
      </Link>

    </div>
    {(error) && <p className='text-orange-600 mt-5'>{error}</p>}
    </div>
  );
  
}
