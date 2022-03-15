import React,{useState} from "react";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import Geocode from "react-geocode";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();


function Searchbar(props) {
  const {onSearchSubmit,searchAddress,onSearchChange} = props;
  // const {coordinates, radius, videogames, afterDate, beforeDate} = variables;
  // const [locationAddress, setLocationAddress] = useState('');
  const [locationCoordinates, setLocationCoordinates] = useState('');
  // const latitude = coordinates.slice(0,coordinates.indexOf(','));
  // const longitude = coordinates.slice(coordinates.indexOf(' ')+1,coordinates.length);
  // console.log(`pregeocode latitude: ..${latitude}..    pregeocode longitude:..${longitude}.. `);
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
            newVideogames: [1]
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
    // console.log(`address change event: ${JSON.stringify(event)}`);
    onSearchChange({newAddress: event.target.value});
  }

  return (
    <form onSubmit={searchTournaments}>
      <div display="inline">
        <label htmlFor="location">Location</label>
        <input id="location" 
          value={searchAddress} 
          type="text" 
          onChange={e => onAddressChange(e)}
          style={{width:'400px'}}/>

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
          name="melee"
          type="checkbox"
          /*checked={this.state.isGoing}
            onChange={this.handleInputChange}*/
        />
        <label htmlFor="melee">Super Smash Bros. Melee</label>
        <input
          name="ultimate"
          type="checkbox"
          /*checked={this.state.isGoing}
            onChange={this.handleInputChange}*/
        />
        <label htmlFor="melee">Super Smash Bros. Ultimate</label>
        <input
          name="projectPlus"
          type="checkbox"
          /*checked={this.state.isGoing}
            onChange={this.handleInputChange}*/
        />
        <label htmlFor="melee">Project +</label>
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