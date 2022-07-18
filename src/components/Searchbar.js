import React, { useState } from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import getConfig from "next/config";
import styles from "../styles/searchbar.module.css";
import { Autocomplete } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import Filters from "../components/Filters";
import "react-datepicker/dist/react-datepicker.css";

const { publicRuntimeConfig } = getConfig();

function Searchbar(props) {
  const { onSearchSubmit, onSearchError } = props;
  const [autocompleteAddress, setAutocompleteAddress] = useState(null);
  const [searchRadius, setSearchRadius] = useState("10mi");
  const [searchGames, setSearchGames] = useState([1, 1386, 33602]);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchStartDate, setSearchStartDate] = useState(Date.now());
  const [filterToggle, setFilterToggle] = useState(false);
  Geocode.setApiKey(publicRuntimeConfig.GoogleMapsAPIKey);

  const onGeolocationClick = (event) => {
    event.preventDefault();

    const handleSuccess = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      Geocode.fromLatLng(latitude, longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setSearchAddress(address);
        },
        (error) => {
          console.error(error);
          setError(error.message);
        }
      );
    };

    const handleError = (error) => {
      setError(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  };

  const handleLoad = (ref) => {
    setAutocompleteAddress(ref);
  };

  const handlePlaceChanged = () => {
    setSearchAddress(autocompleteAddress.getPlace().formatted_address);
  };

  const handleInputChange = (event) => {
    setSearchAddress(event.target.value);
  };

  const handleRadiusChange = (radius) => {
    setSearchRadius(radius);
  }
  
  const handleGameChange = (games) =>{
    setSearchGames(games);
  }

  const handleStartDateChange = (date) => {
    setSearchStartDate(date);
  }

  const handleFiltersToggle = (toggle) => {
    console.log(filterToggle);
    setFilterToggle(toggle);
  }

  function searchTournaments(event) {
    event.preventDefault();

    Geocode.fromAddress(searchAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        onSearchSubmit({
          searchCoordinates: [lat, lng],
          searchRadius: event.target.radius.value,
          searchVideogames: searchGames,
          searchAfterDate: Math.floor(searchStartDate/1000),
        });
      },
      (error) => {
        onSearchError(error);
      }
    );
  }

  function onGameChange(gameId) {
    if (searchGames.includes(gameId)) {
      if (searchGames.length > 1) {
        setSearchGames(searchGames.filter((item) => item !== gameId));
      }
    } else {
      setSearchGames(searchGames.concat([gameId]));
    }
  }

  return (
    <React.Fragment>
      <form className={styles.searchForm} onSubmit={searchTournaments}>
        <div className={styles.searchbar}>
          <label htmlFor="location"><b>Location</b></label>
          <a className={styles.geoLocation} href="#" onClick={onGeolocationClick}>
            Use your current location
          </a>
          <a className={styles.filtersToggleTopRight} onClick={()=>setFilterToggle(!filterToggle)}>Filters</a>
          <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              className={styles.searchbarInput}
              id="location"
              placeholder="Enter an address here"
              value={searchAddress}
              onChange={handleInputChange}
            />
          </Autocomplete>
        </div>

        <div className={styles.filters}>
          { filterToggle ? 
            (
              <Filters 
                searchRadius = {searchRadius}
                searchGames = {searchGames}
                searchStartDate = {searchStartDate}
                onRadiusChanged = {handleRadiusChange}
                onGameChanged = {handleGameChange}
                onStartDateChanged = {handleStartDateChange}
                onFilterToggle = {handleFiltersToggle}
                />
                )
              :
              <a className={styles.filterToggle} onClick={()=>setFilterToggle(!filterToggle)}>Filters</a>
          }
          {/* <div className={styles.searchFilterContainer}>
            <div className={styles.searchFilters}>
              <div className={styles.radiusFilter}>
                <label htmlFor="radius">Radius </label>
                <select id="radius">
                  <option default value="10mi">
                    10mi
                  </option>
                  <option value="20mi">20mi</option>
                  <option value="30mi">30mi</option>
                  <option value="40mi">40mi</option>
                  <option value="50mi">50mi</option>
                  <option value="75mi">75mi</option>
                  <option value="100mi">100mi</option>
                </select>
              </div>
              <div className={styles.dateFilter}>
                <label htmlFor="afterDate">After Date: </label>
                <DatePicker
                  selected={searchstartDate}
                  onChange={(date) => setSearchStartDate(date)}
                  minDate={new Date()}
                  dateFormat="MM/dd/yy"
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [-35, 5],
                      },
                    },
                    {
                      name: "preventOverflow",
                      options: {
                        rootBoundary: "viewport",
                        tether: false,
                        altAxis: true,
                      },
                    },
                  ]}
                />
              </div>
              <div className={styles.gameFilters}>
                <label>Games: </label>
                <div className={styles.gameList}>
                  <div className={styles.gameCheckbox}>
                    <input
                      name="melee"
                      type="checkbox"
                      checked={searchGames.includes(1)}
                      onChange={() => onGameChange(1)}
                    />
                    <label htmlFor="melee">SSBM</label>
                  </div>
                  <div className={styles.gameCheckbox}>
                    <input
                      name="ultimate"
                      type="checkbox"
                      checked={searchGames.includes(1386)}
                      onChange={() => onGameChange(1386)}
                    />
                    <label htmlFor="ultimate">SSBU</label>
                  </div>
                  <div className={`${styles.gameCheckbox} ${styles.pPlus}`}>
                    <input
                      name="projectPlus"
                      type="checkbox"
                      checked={searchGames.includes(33602)}
                      onChange={() => onGameChange(33602)}
                    />
                    <label htmlFor="projectPlus">P+</label>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <button className={styles.submitButton} type="submit">
            Search!
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

Searchbar.propTypes = {
  onClick: PropTypes.func,
};

export default Searchbar;
