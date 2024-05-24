import React from 'react';                                                    // Import React library
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';      // Import GoogleMap, LoadScript, and Marker components from '@react-google-maps/api'
import PropTypes from 'prop-types';                                            // Import PropTypes from the 'prop-types' library

const containerStyle = {
  width: '100%',                                                               // Set the width of the container to 100%
  height: '400px',                                                           // Set the height of the container to 400 pixels
};

function Map({ address }) {
  const [location, setLocation] = React.useState({ lat: 0, lng: 0 });            // Define the initial state for location using React.useState


  // useEffect hook to fetch location data when the address prop changes
  React.useEffect(() => {
    if (address) {                         // Check if the address is provided
      const geocodeAddress = async () => {      // Define an asynchronous function to fetch geocode data based on the address
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCAN8ofn89DQtfFRjiOJ13w4KaD6Aaynb4`);   // Fetch the geocode data from the Google Maps Geocoding API
        const data = await response.json();                                                // Convert the response to JSON format
        if (data.results.length > 0) {                                                     // Check if the response contains any results
          const { lat, lng } = data.results[0].geometry.location;                      // Extract latitude and longitude from the first result
          setLocation({ lat, lng });                                                     // Update the location state with the fetched coordinates
        }
      };
      geocodeAddress();                         // Call the geocodeAddress function
    }
  }, [address]);                       // Depend on the address variable to trigger the effect when it changes


    // Render the GoogleMap component inside the LoadScript component
  return (
    <LoadScript googleMapsApiKey="AIzaSyCAN8ofn89DQtfFRjiOJ13w4KaD6Aaynb4">            {/* LoadScript component to load the Google Maps API with the provided API key */}
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
        <Marker position={location} />      {/* Render a marker at the specified location */}
      </GoogleMap>
    </LoadScript>
  );
}

Map.propTypes = {
  address: PropTypes.string.isRequired,                 // Define the 'address' prop type as a required string
};

export default Map;
