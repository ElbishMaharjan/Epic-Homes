import { configureStore } from '@reduxjs/toolkit';
import useReducer  from './user/userSlice';    // Importing the default export from userSlice.js

// Configure Redux store
export const store = configureStore({
  reducer: {user: useReducer},       // Adding the userReducer to the Redux store
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,       // Allowing non-serializable values in Redux state
  }),
});

//Redux-toolkit== we can have access to the user data in different places in our application.
//instead of using a local estate, we are going to have a global estate using using redux toolkit.so,that we can have access to this user information everywhere, like header and profile.