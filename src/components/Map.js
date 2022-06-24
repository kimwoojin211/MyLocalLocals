import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import styles from '../styles/map.module.css';

function Map(props){
  const {searchedCoordinates, tournamentCoordinates} = props;
  console.log(`searched coordinates: ${searchedCoordinates}`)
  const searchedLat= parseFloat(searchedCoordinates.slice(0,searchedCoordinates.indexOf(',')));
  const searchedLng= parseFloat(searchedCoordinates.slice(searchedCoordinates.indexOf(',')+2));
  console.log(`${searchedLat} ${searchedLng}`);
  
  const mapStyles = {        
    height: "100%",
    width: "100%"
  };
  
  const center = {
    lat: tournamentCoordinates ? tournamentCoordinates[0]:searchedLat, 
    lng: tournamentCoordinates ? tournamentCoordinates[1]:searchedLng
  }


  console.log(`searched coordinates: ${JSON.stringify(center)}`)
  
  const onLoad = marker => {
    console.log('marker: ', marker);
  }
  
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
          >
            <Marker onLoad={onLoad} position={center} />
          </GoogleMap>
      </div>
    </div>
  )
}

export default Map;