import React, { useState } from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import getConfig from "next/config";
import styles from "../styles/searchbar.module.css";
import { Autocomplete } from "@react-google-maps/api";
import Filters from "../components/Filters";
import "react-datepicker/dist/react-datepicker.css";

const { publicRuntimeConfig } = getConfig();

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDates(date){
    return `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}`;
}

function formatGames(gameArray){
  const str = `${(gameArray.includes(1) ? "SSBM, ": "")} ${(gameArray.includes(1386) ? "SSBU, ": "")} ${(gameArray.includes(33602) ? "P+, ": "")} ${(gameArray.includes(4) ? "SSB64, ": "")}  ${(gameArray.includes(24) ? "RoA, ": "")} ${(gameArray.includes(39281) ? "NASB, ": "")}`;
  return str.substring(0,str.length-2);
}

function Searchbar(props) {
  const { onSearchSubmit, onSearchError, onSortChange, sortOption } = props;
  const [autocompleteAddress, setAutocompleteAddress] = useState(null);
  const [searchRadius, setSearchRadius] = useState("10mi");
  const [searchGames, setSearchGames] = useState([1, 1386, 33602, 463676, 24, 39281]);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchStartDate, setSearchStartDate] = useState(new Date(Date.now()));
  const [searchEndDate, setSearchEndDate] = useState(null);
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
    if(searchEndDate && date>=searchEndDate){
      setSearchEndDate(addDays(date,1));
    }
    setSearchStartDate(date);
  }

  const handleEndDateChange = (date) => {
    if(!date || date>searchStartDate){
      
      setSearchEndDate(date);
    }
    else{
      setSearchEndDate(addDays(searchStartDate,1));
    }
  }

  const handleFilterToggle = (toggle) => {
    setFilterToggle(toggle);
  }

  function searchTournaments(event) {
    event.preventDefault();
    setFilterToggle(false);
    Geocode.fromAddress(searchAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        onSearchSubmit({
          searchCoordinates: [lat, lng],
          searchRadius: searchRadius,
          searchVideogames: searchGames,
          searchAfterDate: Math.floor(addDays(searchStartDate,-2)/1000),
          searchBeforeDate: Math.floor(searchEndDate/1000)
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
          <label htmlFor="location">
            <b>Location</b>
          </label>
          <a
            className={styles.geoLocation}
            href="#"
            onClick={onGeolocationClick}
          >
            Use your current location
          </a>
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

        <div className={styles.filtersContainer}>
          <div className={`${styles.filters} ${styles.filters__active}`}>
            <div className={`${styles.filterSettings} ${styles.filterSettings__active}`}>
              <div className={`${styles.sortOptions}`}>
                <span><b>Sort</b>:</span>
                <div>
                  <input name="sortTime" type="radio" onClick={()=>{onSortChange(false)}} checked={!sortOption}/>
                  <label htmlFor="sortTime">Time</label>
                </div>
                <div>
                  <input name="sortDistance" type="radio" onClick={()=>{onSortChange(true)}} checked={sortOption} />
                  <label htmlFor="sortDistance">Dist.</label>
                </div>
              </div>
            </div>

              <Filters
                searchRadius={searchRadius}
                searchGames={searchGames}
                searchStartDate={searchStartDate}
                searchEndDate={searchEndDate}
                onRadiusChanged={handleRadiusChange}
                onGameChanged={handleGameChange}
                onStartDateChanged={handleStartDateChange}
                onEndDateChanged={handleEndDateChange}
                onFilterToggle={handleFilterToggle}
              />
          </div>
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
