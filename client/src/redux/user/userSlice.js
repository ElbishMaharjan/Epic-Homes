import { createSlice } from '@reduxjs/toolkit';

// Initial state for user slice
const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

// Creating user slice with reducers
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reducer for signaling the start of sign-in process
        signInStart: (state)=>{
            state.loading = true;
        },
         // Reducer for successful sign-in
        signInSuccess: (state, action) =>{      //action is the data we get from the date when we recive the data from database,we want to get the data we set
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        // Reducer for sign-in failure
        signInFailure: (state, action) =>{
            state.error= action.payload
            state.loading = false;
        }
    }
});
// Exporting action creators
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
// Exporting the user slice reducer
export default userSlice.reducer;