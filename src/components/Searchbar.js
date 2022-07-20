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

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDates(date){
  // return `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${(date.getFullYear().toString()).slice(-2)}`;
    return `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}`;
}

function formatGames(gameArray){
  const str = `${(gameArray.includes(1) ? "SSBM, ": "")} ${(gameArray.includes(1386) ? "SSBU, ": "")} ${(gameArray.includes(33602) ? "P+, ": "")} ${(gameArray.includes(4) ? "SSB64, ": "")}  ${(gameArray.includes(24) ? "RoA, ": "")} ${(gameArray.includes(39281) ? "NASB, ": "")}`;
  console.log(typeof(str));
  return str.substring(0,str.length-2);
}

function Searchbar(props) {
  const { onSearchSubmit, onSearchError } = props;
  const [autocompleteAddress, setAutocompleteAddress] = useState(null);
  const [searchRadius, setSearchRadius] = useState("10mi");
  const [searchGames, setSearchGames] = useState([1, 1386, 33602, 4, 24, 39281]);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchStartDate, setSearchStartDate] = useState(new Date(Date.now()));
  const [searchEndDate, setSearchEndDate] = useState(null);
  const [filterToggle, setFilterToggle] = useState(false);
  const [sortSearch, setSortSearch] = useState(true);
  console.log(`~~~~~~search Radius ~~~~ ${searchRadius} ~~~~~~search start date ~~~~ ${searchStartDate} ~~~~~~search end date ~~~~ ${searchEndDate} `);
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
    console.log(`(clicked date): ${date} ~~~~~~~~~~~~ (start date): ${searchStartDate} ~~~~~~~~~~~~ (end date): ${searchEndDate}`)
  }

  const handleFilterToggle = (toggle) => {
    console.log(filterToggle);
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
          {/* <a
            className={styles.filterToggleTopRight}
            onClick={() => setFilterToggle(!filterToggle)}
          >
            Filters
          </a> */}
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
              {/* <a
                className={filterToggle ? styles.filterClose__active : styles.filterClose}
                onClick={() => setFilterToggle(!filterToggle)}
              >
                Close
              </a> */}
              <div className={`${styles.sortOptions}`}>
                <span><b>Sort</b>:</span>
                <div>
                  <input name="sortTime" type="radio" onClick={()=>{setSortSearch(true)}} checked={sortSearch}/>
                  <label htmlFor="sortTime">Time</label>
                </div>
                <div>
                  <input name="sortDistance" type="radio" onClick={()=>{setSortSearch(false)}} checked={!sortSearch} />
                  <label htmlFor="sortDistance">Dist.</label>
                </div>
              </div>
            </div>
              {/* { filterToggle ?
                  <div></div> :
                  (<div className={styles.filterPreview} onClick={() => setFilterToggle(true)}>
                    <div className={styles.previewWrapper}>
                      <span>Radius</span>
                      <span>{searchRadius}</span>
                    </div>
                    <div className={styles.previewWrapper}>
                      <span>From</span>
                      <span>{formatDates(searchStartDate)}</span>
                    </div>
                    <div className={styles.previewWrapper}>
                      <span>To</span>
                      <span>{ searchEndDate ? formatDates(searchEndDate) : '--/--'}</span>
                    </div>
                    <div className={styles.previewWrapper}>
                      <span>Games</span>
                      <span>{ searchGames.length }</span>
                    </div>
                  </div>)
              } */}

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
        </div>
      </form>
    </React.Fragment>
  );
}

Searchbar.propTypes = {
  onClick: PropTypes.func,
};

export default Searchbar;
