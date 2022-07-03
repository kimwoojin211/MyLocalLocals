import React from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import styles from "../styles/map.module.css";

function Map(props) {
  const { searchedCoordinates, selectedTournament } = props;
  const searchedLat = searchedCoordinates[0];
  const searchedLng = searchedCoordinates[1];

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const searchedCenter = {
    lat: searchedLat,
    lng: searchedLng,
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={selectedTournament.selectedCoordinates ? 10 : 13}
          center={searchedCenter}
        >
          <Marker
            position={searchedCenter}
            icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
          />
          {selectedTournament.selectedCoordinates && (
            <InfoWindow
              position={{
                lat: selectedTournament.selectedCoordinates[0],
                lng: selectedTournament.selectedCoordinates[1],
              }}
            >
              <div className={styles.infoWindowWrapper}>
                <img
                  src={selectedTournament.thumbnailURL}
                  className={styles.tournamentThumbnail}
                ></img>
                <div className={styles.tournamentInfo}>
                  <h5>{selectedTournament.tournamentName}</h5>
                  <p>{selectedTournament.tournamentAddress}</p>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
