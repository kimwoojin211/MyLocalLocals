import React,{useState} from "react";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import Geocode from "react-geocode";
import getConfig from 'next/config';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import Autocomplete from "react-google-autocomplete";


const { publicRuntimeConfig } = getConfig();


function Searchbar(props) {
  const {onSearchSubmit,searchAddress,onSearchChange} = props;
  // const {coordinates, radius, videogames, afterDate, beforeDate} = variables;
  // const [locationAddress, setLocationAddress] = useState('');
  // const [locationCoordinates, setLocationCoordinates] = useState('');
  const [checkedGames,setCheckedGames] = useState([1, 1386, 33602]);

  console.log(`WHERE ARE MY CHECKEDGAMES ${checkedGames}`);
  
// const latitude = coordinates.slice(0,coordinates.indexOf(','));
// const longitude = coordinates.slice(coordinates.indexOf(' ')+1,coordinates.length);
// console.log(`pregeocode latitude: ..${latitude}..    pregeocode longitude:..${longitude}.. `);


  // const {checkedGames,setCheckedGames} = [
  //   true, //game 1 = melee (id=1)
  //   true, //game 2 = ultimate (id= 1386)
  //   true  //game 3 = P+ (id=33602)
  // ]; 


    // const [game1Checked, setGame1Checked] = useState(true);
    // const [game2Checked, setGame2Checked] = useState(true);
    // const [game3Checked, setGame3Checked] = useState(true);

    // console.log(`GAMES CHECKED ${game1Checked}, ${game2Checked}, ${game3Checked}`)

  Geocode.setApiKey( publicRuntimeConfig.GoogleMapsAPIKey);

  // const success = position => {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   console.log(latitude, longitude);
  //   Geocode.fromLatLng(latitude, longitude).then((response) =>{
  //     const reverseGeocodeResults = response.results[0];
  //     console.log(`reverseGeocode raw: ${JSON.stringify(reverseGeocodeResults)}`);
  //     const address = response.results[0].formatted_address;
  //     console.log(address);
  //     setLocationAddress(address);
  //     },
  //       (error) => {
  //       console.error(error);
  //       }
  //     );
  //   setLocationCoordinates(`${position.coords.latitude}, ${position.coords.longitude}`);
  //   // setLocationAddress(address);
  //   console.log(JSON.stringify(`${locationAddress}, ${locationCoordinates}`));
  // };
    
  // if (navigator.geolocation) {
  //   console.log('GeoLocation is Available!');
  //   navigator.geolocation.getCurrentPosition(
  //     success,
  //     () => console.log(`Geolocation permission has been blocked. If you'd like to use your current location, please click 'Use Current Location'`)
  //     );
  //   // console.log(test());
  //   // this.setState({ queryCoordinates: ``});
  // } else {
  // console.log(`Geolocation not available`);
  // }


  // if(latitude != "" && longitude != ""){
  // Geocode.setApiKey( publicRuntimeConfig.GoogleMapsAPIKey);
  // Geocode.fromLatLng(latitude, longitude).then((response) =>{
  //   const reverseGeocodeResults = response.results[0];
  //   console.log(`reverseGeocode raw: ${JSON.stringify(reverseGeocodeResults)}`);
  //   const address = reverseGeocodeResults.formatted_address;
  //   console.log(address);
  //   setLocationAddress(address);
  //   },
  //     (error) => {
  //     console.error(error);
  //     }
  //   );
  // console.log(`locationAddress: ${locationAddress}`);
  // }

  function searchTournaments(event){
    event.preventDefault(); // don't redirect the page
    console.log('submitted');
    Geocode.fromAddress(searchAddress).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      onSearchSubmit({
            newCoordinates: `${lat}, ${lng}`,
            newRadius: event.target.radius.value,
            newVideogames: checkedGames
          });
    },
  (error) => {
    console.error(error);
    onSearchSubmit({error: true}) 
  }); 
    
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
      console.log(`WHERE ARE MY CHECKEDGAMESSSSSSSSSSSSSS ${checkedGames}, ${typeof checkedGames}`);
      setCheckedGames(checkedGames.filter(item => item !== gameId));
      console.log(`WHERE ARE MY CHECKEDGAMESSSSSSSSSSSSSS ${checkedGames}`);
    }
    else
    {
      setCheckedGames(checkedGames.concat([gameId]));
    }
  }

  return (
    <form onSubmit={searchTournaments}>
      <div display="inline">
        <label htmlFor="location">Location</label>
        {/* <input id="location" 
          value={searchAddress} 
          type="text" 
          onChange={e => onAddressChange(e)}
          style={{width:'400px'}}/> */}
        <GooglePlacesAutocomplete 
          apiKey={publicRuntimeConfig.GoogleMapsAPIKey}
          id="location"
          selectProps={{
            searchAddress,
            onChange: e => onAddressChange(e) 
          }}
        />
        {/* <Autocomplete 
          apiKey={publicRuntimeConfig.GoogleMapsAPIKey}
          id="location"
          defaultValue={searchAddress}
          onPlaceSelected={{onChange: e => onAddressChange(e)}}
          style={{width:'300px'}}/> */}
        <label htmlFor="radius">Radius</label>
        <select id="radius">
          <option default value="10mi">10mi</option>
          <option value="20mi">20mi</option>
          <option value="30mi">30mi</option>
          <option value="40mi">40mi</option>
          <option value="50mi">50mi</option>
        </select>

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
      <label htmlFor="games">
        Games:
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

      </label>
      <button type="submit">Submit!</button>
      </div>
    </form>
  );
}

Searchbar.propTypes = {
  onClick: PropTypes.func
}

export default Searchbar;