import { combineReducers, configureStore } from '@reduxjs/toolkit';
import useReducer  from './user/userSlice';    // Importing the default export from userSlice.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

// Combine reducers if you have more than one
const rootReducer = combineReducers({user: useReducer})

const persistconfig = {  //creating persistconfig
  key: 'root',  //name=root
  storage,
  version: 1,
}

// Wrap rootReducer with persistReducer to enable state persistence
const persistedReducer = persistReducer(persistconfig, rootReducer)

// Configure Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,       // Allowing non-serializable values in Redux state
  }),
});

export const persistor = persistStore(store);

//Redux-toolkit== we can have access to the user data in different places in our application.
//instead of using a local estate, we are going to have a global estate using using redux toolkit.so,that we can have access to this user information everywhere, like header and profile.

//Redux-Persist== if you refresh the page, you're going to lose the data.we dont want to be like that because each time user refresh the page they need to sign-in again.so in order to fix that, we need to store user's data in places like a local storage of the browser.