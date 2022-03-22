import React,{useState} from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import getConfig from 'next/config';
import styles from '../styles/searchbar.module.css';
import {StandaloneSearchBox, Autocomplete} from '@react-google-maps/api';
// import Autocomplete from "react-google-autocomplete";


const { publicRuntimeConfig } = getConfig();


function Searchbar(props) {
  const {onSearchSubmit,geolocationAddress,onSearchChange} = props;
  const [checkedGames,setCheckedGames] = useState([1, 1386, 33602]);
  const [newAddress,setNewAddress] = useState(null);
  const [searchAddress,setSearchAddress] = useState(null);

  Geocode.setApiKey( publicRuntimeConfig.GoogleMapsAPIKey);
  const onLoad = (ref) => {
        setNewAddress(ref);
      console.log(`searchaddress currently set to ${JSON.stringify(searchAddress)} 2`);
      }

  const onPlaceChanged = () => {
    console.log(`${newAddress.getPlace().formatted_address}??????????????????????????????????????`);
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

    
      // setLocationCoordinates(`${position.coords.latitude}, ${position.coords.longitude}`);
      // setLocationAddress(address);
    // console.log(JSON.stringify(`${locationAddress}, ${locationCoordinates}`));
  };

      // onSearchSubmit({
      //   newCoordinates: locationCoordinates,
      //   newRadius: event.target.radius.value,
      //   newVideogames: [1]
      // });
    // onSearch({
    //   // newPerPage:5,
    //   newCoordinates: event.target.location.value,
    //   newRadius: event.target.radius.value,
    //   newVideogames: [1]
  // }

  function onAddressChange(event){
    console.log(`address change event: ${JSON.stringify(event)}`);
    onSearchChange({newAddress: event.label});
  }

  function onGameChange(gameId){
    if(checkedGames.includes(gameId)){
      // setCheckedGames(checkedGames.splice(checkedGames.indexOf(gameId),1));
      // console.log(`WHERE ARE MY CHECKEDGAMESSSSSSSSSSSSSS ${checkedGames}, typeof checkedGames}`);
      setCheckedGames(checkedGames.filter(item => item !== gameId));
      // console.log(`WHERE ARE MY CHECKEDGAMESSSSSSSSSSSSSS ${checkedGames}`);
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
        {/* <input id="location" 
          value={searchAddress} 
          type="text" 
          onChange={e => onAddressChange(e)}
          style={{width:'400px'}}/> */}

        {/* <GooglePlacesAutocomplete 
          apiKey={publicRuntimeConfig.GoogleMapsAPIKey}
          id="location"
          selectProps={{
            searchAddress,
            onChange: e => onAddressChange(e),
            className: styles.autocomplete
          }}
        /> */}
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
        {/* <Autocomplete 
          apiKey={publicRuntimeConfig.GoogleMapsAPIKey}
          id="location"
          defaultValue={searchAddress}
          onPlaceSelected={{onChange: e => onAddressChange(e)}}
          style={{width:'300px'}}/> */}


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

        {/* <label htmlFor="afterDate">Start Date:</label>
        <DatePicker
          selected={Date.now()}
          onChange={(date) => setStartDate(date)}
          selectsStart
          // startDate={startDate}
          // endDate={endDate}
          id="afterDate"
        /> */}

        {/* <label htmlFor="beforeDate">End Date</label>
        <DatePicker
          // selected={endDate}
          // onChange={(date) => setEndDate(date)}
          selectsEnd
          // startDate={startDate}
          // // endDate={endDate}
          // // minDate={startDate}
          id="beforeDate"
      /> */}
        <div className="gameFilters" >
          <span>Games: </span> 
          <input
            name= "melee"
            type= "checkbox"
            checked= {checkedGames.includes(1)}
            onChange={() => onGameChange(1)}
          />
          <label htmlFor="melee">Super Smash Bros. Melee</label>

          <input
            name="ultimate"
            type="checkbox"
            checked= {checkedGames.includes(1386)}
            onChange={() => onGameChange(1386)}
          />
          <label htmlFor="ultimate">Super Smash Bros. Ultimate</label>

          <input
            name="projectPlus"
            type="checkbox"
            checked= {checkedGames.includes(33602)}
            onChange={() => onGameChange(33602)}
          />
          <label htmlFor="projectPlus">Project +</label>

        </div>
        <button type="submit">Search!</button>
      </div>
      
    </div>
    </form>
  );
}

Searchbar.propTypes = {
  onClick: PropTypes.func
}

export default Searchbar;