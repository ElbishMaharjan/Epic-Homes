import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js'; // Importing Redux store
import { Provider } from 'react-redux';      
import { PersistGate } from 'redux-persist/integration/react';


// Rendering the app with Redux store provider and PersistGate
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading = {null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
);
