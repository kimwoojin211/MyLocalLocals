import React, {useState, useEffect, useCallback} from "react";
import { GoogleMap, Marker, InfoWindow, Polyline } from "@react-google-maps/api";
import styles from "../styles/map.module.css";

//Object.keys(selectedTournament).length !== 0
function Map(props) {
  const [map,setMap] = useState(null);
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

  const selectedCenter = selectedTournament && ({
    lat: selectedTournament.tournamentLat,
    lng: selectedTournament.tournamentLng
  })

  const path = selectedTournament ? [searchedCenter,selectedCenter] : [searchedCenter]

  const onLoad = useCallback((map) => setMap(map), []);

  useEffect(() => {
    if (map && selectedTournament) {
      const bounds = new window.google.maps.LatLngBounds();
      path.map(marker => {
        bounds.extend({
          lat: marker.lat,
          lng: marker.lng,
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, path]);
  

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          onLoad={onLoad}
          zoom={selectedTournament ? 15: 13 }
          center={selectedTournament ? { lat:(selectedCenter.lat + searchedCenter.lat)/2, lng: (selectedCenter.lng + searchedCenter.lng)/2} : searchedCenter}
        >
          <Marker
            position={searchedCenter}
            icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
          />
          {
            selectedTournament && (
            // <div>
            <InfoWindow
              position={{
                lat: selectedTournament.tournamentLat,
                lng: selectedTournament.tournamentLng,
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
            // </div> 
          )}
          {selectedTournament && (            
            <Polyline path={[searchedCenter,{lat: selectedTournament.tournamentLat, lng: selectedTournament.tournamentLng}]}></Polyline>)
          }
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
