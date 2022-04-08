import React,{useState} from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import getConfig from 'next/config';
import styles from '../styles/searchbar.module.css';
import {Autocomplete} from '@react-google-maps/api';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const { publicRuntimeConfig } = getConfig();

function Searchbar(props) {
  const {onSearchSubmit,onSearchChange, hasSearched} = props;
  const [checkedGames,setCheckedGames] = useState([1, 1386, 33602]);
  const [coordinates,setCoordinates] = useState(null);
  const [autocompleteAddress,setAutocompleteAddress] = useState(null);
  const [searchAddress,setSearchAddress] = useState('');
  const [startDate, setStartDate] = useState(Date.now());

  Geocode.setApiKey( publicRuntimeConfig.GoogleMapsAPIKey);

  const onGeolocationClick = (event) => { 
    event.preventDefault();

    const handleSuccess = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log('owrghaowrighiawroigh' + position, latitude, longitude);
      setSearchAddress(`${latitude} ${longitude}`)
      // Geocode.fromLatLng(latitude, longitude).then((response) =>{
      //   const reverseGeocodeResults = response.results[0];
      //   console.log(`reverseGeocode raw: ${JSON.stringify(reverseGeocodeResults)}`);
      //   const address = response.results[0].formatted_address;
      //   console.log(address);
      //   setSearchAddress(address);
      // },
      //   (error) => {
      //   console.error(error);
      //   setError(error.message);
      //   }
      // );
    };

    const handleError = error => {
      setError(error.message);
    } 
  
    if (navigator.geolocation) {
        console.log('GeoLocation is Available!');
        navigator.geolocation.getCurrentPosition(handleSuccess,handleError);
        console.log(`updated address ${searchAddress}`)
      } else {
      console.log(`Geolocation not available`);
      }
  }

  const handleLoad = (ref) => { setAutocompleteAddress(ref); }

  const handlePlaceChanged = () => {
      setSearchAddress(autocompleteAddress.getPlace().formatted_address);
  }

  const handleInputChange = (event) => {
    setSearchAddress(event.target.value);

  }

  function searchTournaments(event){
    event.preventDefault(); // don't redirect the page
    onSearchSubmit({
              searchCoordinates: '33.895543, -117.967085',
              searchRadius: '50mi',
              searchVideogames: [1, 1386, 33602],
              searchAfterDate: Math.floor(Date.now()/1000),
              searchError: null
    });

    // Geocode.fromAddress(searchAddress).then((response) => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     onSearchSubmit({
    //           newCoordinates: [lat, lng],
    //           newRadius: event.target.radius.value,
    //           newVideogames: checkedGames,
    //           newAfterDate: Math.floor(Date.now()/1000),
    //           error: false
    //         });
    //     },
    //   (error) => {
    //     console.error(error);
    //     onSearchSubmit({error: true}) 
    //   });

    // console.log(`submitted + ${searchAddress}`);
    // const newAddress = searchAddress ? searchAddress : (geolocationAddress? geolocationAddress : null);
    // if(newAddress){
    //   Geocode.fromAddress(newAddress).then((response) => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     onSearchSubmit({
    //           newCoordinates: [lat, lng],
    //           newRadius: event.target.radius.value,
    //           newVideogames: checkedGames,
    //           newAfterDate: Math.floor(Date.now()/1000),
    //           error: false
    //         });
    //     },
    //   (error) => {
    //     console.error(error);
    //     onSearchSubmit({error: true}) 
    //   });
    // }
    // else{
    //   onSearchSubmit({error:true})
    // } 
  };

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
    <React.Fragment>
     {/* <div className={styles.searchContainer}
       style={{ margin:(hasSearched ? '1rem 0 1.5rem 0': 'auto')}}>  */}
      <form className={styles.searchForm} onSubmit={searchTournaments}>
        <div className={styles.searchbar}>
          <label htmlFor="location">Location</label>
          <a href="#" onClick={onGeolocationClick}>Use your current location</a>
          <Autocomplete    
            onLoad={handleLoad}
            onPlaceChanged={ handlePlaceChanged }
          >
            <input
              type="text"
              id="location"
              placeholder="Enter an address here"
              value={searchAddress}
              onChange={handleInputChange}
              style={{
                border: `1px solid transparent`,
                width: `100%`,
                height: `32px`,
                borderRadius: `6px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                marginTop: '3px'
              }}
            />
          </Autocomplete>
          </div>

          <div className={styles.filters}>
              <div className={styles.searchFilterContainer}>
                
                <div className={styles.searchFilters}>
                  <div className={styles.radiusFilter}>
                    <label htmlFor="radius">Radius </label>
                    <select id="radius">
                      <option default value="10mi">10mi</option>
                      <option value="20mi">20mi</option>
                      <option value="30mi">30mi</option>
                      <option value="40mi">40mi</option>
                      <option value="50mi">50mi</option>
                    </select>
                  </div>
                  <div className={styles.dateFilter}>
                    <label htmlFor="afterDate">After Date: </label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} dateFormat="MM/dd/yy" />
                  </div>
                  <div className={styles.gameFilters}>
                    <label>Games: </label>
                    <div className={styles.gameList}>
                      <div className={styles.gameCheckbox}>
                        <input
                          name= "melee"
                          type= "checkbox"
                          checked= {checkedGames.includes(1)}
                          onChange={() => onGameChange(1)}
                        />
                        <label htmlFor="melee">SSBM</label>
                      </div>
                      <div className={styles.gameCheckbox}>
                        <input
                          name="ultimate"
                          type="checkbox"
                          checked= {checkedGames.includes(1386)}
                          onChange={() => onGameChange(1386)}
                        />
                        <label htmlFor="ultimate">SSBU</label>
                      </div>
                      <div className={`${styles.gameCheckbox} ${styles.pPlus}`}>
                        <input
                          name="projectPlus"
                          type="checkbox"
                          checked= {checkedGames.includes(33602)}
                          onChange={() => onGameChange(33602)}
                        />
                        <label htmlFor="projectPlus">P+</label>
                      </div>
                    </div>
                </div>
              </div>
              
            </div>
            <button className={styles.submitButton} type="submit">Search!</button>
          </div> 
      </form>
      {/* </div> */}
      </React.Fragment>
  )
}

Searchbar.propTypes = {
  onClick: PropTypes.func
}

export default Searchbar;