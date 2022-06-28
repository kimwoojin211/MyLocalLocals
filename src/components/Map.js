import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import styles from '../styles/map.module.css';

function Map(props){
  const {searchedCoordinates, selectedTournament} = props;
  console.log(`searched coordinates: ${searchedCoordinates}`)
  const searchedLat= parseFloat(searchedCoordinates.slice(0,searchedCoordinates.indexOf(',')));
  const searchedLng= parseFloat(searchedCoordinates.slice(searchedCoordinates.indexOf(',')+2));
  console.log(`${searchedLat} ${searchedLng}`);
  
  const mapStyles = {        
    height: "100%",
    width: "100%"
  };
  
  const searchedCenter = {
    lat: searchedLat,
    lng: searchedLng
  }
  
  // const center = {
  //   lat: tournamentCoordinates ? tournamentCoordinates[0]:searchedLat, 
  //   lng: tournamentCoordinates ? tournamentCoordinates[1]:searchedLng
  // }


  console.log(`searched coordinates: ${JSON.stringify(searchedCenter)}`)
    // console.log(`tournament coordinates: ${JSON.stringify(tournamentCoordinates)}`)
  console.log(`tournament coordinates: ${JSON.stringify(selectedTournament)}`)
  
  const onLoad = marker => {
    console.log('marker: ', marker);
  }

  // const infoWindowOptions = {closeboxURL:``, maxWidth:300};
  
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={selectedTournament.selectedCoordinates? 10:13}
          center={searchedCenter}
          >
            <Marker 
              onLoad={onLoad} 
              position={searchedCenter} 
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} 
              />
            {
              selectedTournament.selectedCoordinates && (
                // <Marker 
                //   onLoad={onLoad} 
                //   position={{
                //         lat:selectedTournament.selectedCoordinates[0],
                //         lng:selectedTournament.selectedCoordinates[1]
                //     }} 
                // >
                    <InfoWindow
                      onLoad={onLoad}
                      position={{
                        lat:selectedTournament.selectedCoordinates[0],
                        lng:selectedTournament.selectedCoordinates[1]
                      }}
                      // option={infoWindowOptions} 
                    >
                      <div className={styles.infoWindowWrapper}>
                        <img src={selectedTournament.thumbnailURL} className={styles.tournamentThumbnail}></img>
                        <div className={styles.tournamentInfo}>
                          <h5>{selectedTournament.tournamentName}</h5>
                          <p>{selectedTournament.tournamentAddress}</p>
                        </div>
                      </div>
                    </InfoWindow>
                    // </Marker>
                    )}
          </GoogleMap>
      </div>
    </div>
  )
}

export default Map;