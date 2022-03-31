import React,{useState} from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import getConfig from 'next/config';
import styles from '../styles/searchbar.module.css';
import {Autocomplete} from '@react-google-maps/api';

const { publicRuntimeConfig } = getConfig();

function Searchbar(props) {
  const {onSearchSubmit,geolocationAddress,onSearchChange} = props;
  const [checkedGames,setCheckedGames] = useState([1, 1386, 33602]);
  const [newAddress,setNewAddress] = useState(null);
  const [searchAddress,setSearchAddress] = useState(null);

  Geocode.setApiKey( publicRuntimeConfig.GoogleMapsAPIKey);
  const onLoad = (ref) => { setNewAddress(ref); }

  const onPlaceChanged = () => {
    if(newAddress !== null){
      setSearchAddress(newAddress.getPlace().formatted_address);
    }
  }

  function searchTournaments(event){
    event.preventDefault(); // don't redirect the page
    console.log(`submitted + ${searchAddress}`);
    const newAddress = searchAddress ? searchAddress : (geolocationAddress? geolocationAddress : null);
    if(newAddress){
      Geocode.fromAddress(newAddress).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        onSearchSubmit({
              newCoordinates: [lat, lng],
              newRadius: event.target.radius.value,
              newVideogames: checkedGames,
              newAfterDate: Math.floor(Date.now()/1000),
              error: false
            });
        },
      (error) => {
        console.error(error);
        onSearchSubmit({error: true}) 
      });
    }
    else{
      onSearchSubmit({error:true})
    } 
  };

  function onAddressChange(event){
    onSearchChange({newAddress: event.label});
  }

  function onGameChange(gameId){
    if(checkedGames.includes(gameId)){
      setCheckedGames(checkedGames.filter(item => item !== gameId));
    }
    else
    {
      setCheckedGames(checkedGames.concat([gameId]));
    }
  }

  return (
    <form onSubmit={searchTournaments}>
      <div className={styles.searchbar}>
        <label htmlFor="location">Location</label>
        <Autocomplete    
          onLoad={onLoad}
          onPlaceChanged={ onPlaceChanged }
        >
          <input
            type="text"
            id="location"
            placeholder="Enter an address here"
            defaultValue={geolocationAddress}
            style={{
              border: `1px solid transparent`,
              width: `100%`,
              height: `32px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            }}
          />
        </Autocomplete>
        </div>

        <div className={styles.filters}>
          <div className={styles.dropdowns}>
            <label htmlFor="radius">Radius </label>
            <select id="radius">
              <option default value="10mi">10mi</option>
              <option value="20mi">20mi</option>
              <option value="30mi">30mi</option>
              <option value="40mi">40mi</option>
              <option value="50mi">50mi</option>
            </select>
          </div>

          <div className={styles.gameFilters}>
            <label><b>Games:</b> </label> 
            <label htmlFor="melee">Super Smash Bros. Melee
            <input
              name= "melee"
              type= "checkbox"
              checked= {checkedGames.includes(1)}
              onChange={() => onGameChange(1)}
            />
            </label>

            <label htmlFor="ultimate">Super Smash Bros. Ultimate
            <input
              name="ultimate"
              type="checkbox"
              checked= {checkedGames.includes(1386)}
              onChange={() => onGameChange(1386)}
            /></label>

            <label htmlFor="projectPlus">Project +
            <input
              name="projectPlus"
              type="checkbox"
              checked= {checkedGames.includes(33602)}
              onChange={() => onGameChange(33602)}
            /></label>
          </div>
          <button type="submit">Search!</button>
        </div>
      {/* </div> */}
    </form>
  );
}

Searchbar.propTypes = {
  onClick: PropTypes.func
}

export default Searchbar;