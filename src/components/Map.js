import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const Map = () => {
  const API_KEY = publicRuntimeConfig.GoogleMapsAPIKey;

  const mapStyles = {        
    height: "100%",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: 39.35296715847609, lng: -101.41150043318002
  }
  
  return (
    <div style={{ width: 500, height: 500}}>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={6}
          center={defaultCenter}
        />
      </LoadScript>
    </div>
  )
}

export default Map;