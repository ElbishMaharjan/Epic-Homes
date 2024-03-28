import { createSlice } from '@reduxjs/toolkit';

// Initial state for user slice
const initialState = {
    currentUser: null,       // Current user data
    error: null,             // Error message
    loading: false,          // Loading indicator
};

// Creating user slice with reducers
const userSlice = createSlice({
    name: 'user',        // Name of the slice
    initialState,         // Initial state
    reducers: {
        // Reducer for signaling the start of sign-in process
        signInStart: (state)=>{
            state.loading = true;
        },
         // Reducer for successful sign-in
        signInSuccess: (state, action) =>{      //action is the data we get from the date when we recive the data from database,we want to get the data we set
            state.currentUser = action.payload;     // Set current user data
            state.loading = false;                   // Set loading to false
            state.error = null;                     // Clear any previous errors
        },
        // Reducer for sign-in failure
        signInFailure: (state, action) =>{
            state.error= action.payload;           // Set error message
            state.loading = false;                 // Set loading to false
        },
        // Reducer for signaling the start of user update process
        updateUserStart: (state) => {
            state.loading = true;                  // Set loading to true to track the loading effect
        },
        // Reducer for successful user update
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;     // Set updated user data which we get from the backend as a response
            state.loading = false;                   // Set loading to false
            state.error = null;                      // Clear any previous errors
        },
         // Reducer for user update failure
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // Reducer for signaling the start of user deletion process
        deleteUserStart: (state) => {
            state.loading = true;                      // Set loading to true
        },
        // Reducer for successful user deletion
        deleteUserSuccess: (state) =>{
            state.currentUser = null;                 // Clear currentUser
            state.loading = false;                    // Set loading to false
            state.error = null;                       // Clear any previous errors
        },
        // Reducer for user deletion failure
        deleteUserFailure: (state, action) => {
            state.error = action.payload;             // Set error message
            state.loading = false;                     // Set loading to false
        },
    },
});
// Exporting action creators
export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;
// Exporting the user slice reducer
export default userSlice.reducer;