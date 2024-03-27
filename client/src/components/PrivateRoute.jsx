import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// PrivateRoute component checks if the user is authenticated
// If authenticated, it renders the nested routes (Outlet)
// If not authenticated, it redirects the user to the sign-in page
export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user) // Access current user information from Redux store
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />  // Check if the user is authenticated
}
