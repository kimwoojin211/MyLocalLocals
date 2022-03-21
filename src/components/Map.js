import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import getConfig from 'next/config';
import styles from '../styles/map.module.css';

const { publicRuntimeConfig } = getConfig();

function Map(props){
  const {searchedCoordinates, tournamentCoordinates} = props;
  const API_KEY = publicRuntimeConfig.GoogleMapsAPIKey;

  const mapStyles = {        
    height: "100%",
    width: "100%"
  };
  
  const center = {
    lat: tournamentCoordinates ? tournamentCoordinates[0]:searchedCoordinates[0], 
    lng: tournamentCoordinates ? tournamentCoordinates[1]:searchedCoordinates[1]
  }
  console.log(searchedCoordinates);
  console.log(tournamentCoordinates);
  console.log(center);

  const onLoad = marker => {
    console.log('marker: ', marker);
  }
  
  return (
    <div className={styles.mapContainer}>
      <div style={{ width: '100%', height: '70vmin'}}>
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={center}>
                  <Marker
                      onLoad={onLoad}
                      position={center}
                    />
            </GoogleMap>
        </LoadScript>
      </div>
    </div>
  )
}

export default Map;