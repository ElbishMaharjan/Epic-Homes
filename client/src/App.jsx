import{ BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreatingListing from './pages/CreatingListing';

// App component defines the application's routes and structure
export default function App() {
  return (
     
    <BrowserRouter>        {/* Header component is rendered at the top of the application */}
    <Header/> 
    <Routes>              {/* Routes component defines the application's routes */}
      <Route path="/" element={<Home />} />   {/* Route for the Home page */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoute />}>    {/* PrivateRoute component is used to protect the Profile page */}
        <Route path="/profile" element={<Profile />} />      {/* Nested route for the Profile page */}
        <Route path="/create-listing" element={<CreatingListing />} />      {/* Nested route for the Profile page */}
      </Route>
    </Routes>
    </BrowserRouter>
  );
}
