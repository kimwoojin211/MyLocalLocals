import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import styles from '../styles/map.module.css';

function Map(props){
  const {searchedCoordinates, tournamentCoordinates} = props;

  const mapStyles = {        
    height: "100%",
    width: "100%"
  };
  
  const center = {
    lat: tournamentCoordinates ? tournamentCoordinates[0]:searchedCoordinates[0], 
    lng: tournamentCoordinates ? tournamentCoordinates[1]:searchedCoordinates[1]
  }


  const onLoad = marker => {
    console.log('marker: ', marker);
  }
  
  return (
    <div className={styles.mapContainer}>
      <div style={{ width: '100%', height: '70vmin'}}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}>
            <Marker onLoad={onLoad} position={center} />
          </GoogleMap>
      </div>
    </div>
  )
}

export default Map;