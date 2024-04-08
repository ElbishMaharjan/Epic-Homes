import GoogleMapReact from  'google-map-react';



const SimpleMarkerMap = () => {
const apiKey = 'AIzaSyAlJ4vJYPmiDZadfsmvayo1WGezWHaoFzc';

const mapOptions = {
    mapTypeId: 'satellite', // Specify the map type as satellite
};

return (
    <div style={{ height: '60vh', margin: '0 50px'}}>
<GoogleMapReact
  bootstrapURLKeys={{ key: apiKey }}
  defaultCenter={{ lat: 27.636465, lng: 85.297815 }}
  defaultZoom={14}
  options={mapOptions}
  
>
  
</GoogleMapReact>

</div>
);
};


  
  export default SimpleMarkerMap;
