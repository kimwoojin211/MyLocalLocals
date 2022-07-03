import React, { useState } from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import getConfig from "next/config";
import styles from "../styles/searchbar.module.css";
import { Autocomplete } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const { publicRuntimeConfig } = getConfig();

function Searchbar(props) {
  const { onSearchSubmit, onSearchError } = props;
  const [checkedGames, setCheckedGames] = useState([1, 1386, 33602]);
  const [autocompleteAddress, setAutocompleteAddress] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [startDate, setStartDate] = useState(Date.now());
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

  function searchTournaments(event) {
    event.preventDefault();

    Geocode.fromAddress(searchAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        onSearchSubmit({
          searchCoordinates: [lat, lng],
          searchRadius: event.target.radius.value,
          searchVideogames: checkedGames,
          searchAfterDate: Math.floor(startDate/1000),
        });
      },
      (error) => {
        onSearchError(error);
      }
    );
  }

  function onGameChange(gameId) {
    if (checkedGames.includes(gameId)) {
      if (checkedGames.length > 1) {
        setCheckedGames(checkedGames.filter((item) => item !== gameId));
      }
    } else {
      setCheckedGames(checkedGames.concat([gameId]));
    }
  }

  return (
    <React.Fragment>
      <form className={styles.searchForm} onSubmit={searchTournaments}>
        <div className={styles.searchbar}>
          <label htmlFor="location">Location</label>
          <a href="#" onClick={onGeolocationClick}>
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

        <div className={styles.filters}>
          <div className={styles.searchFilterContainer}>
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
                </select>
              </div>
              <div className={styles.dateFilter}>
                <label htmlFor="afterDate">After Date: </label>
                <DatePicker
                  selected={startDate}
                  // onChange={(date) => console.log(date)}
                  onChange={(date) => setStartDate(date)}
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
                      checked={checkedGames.includes(1)}
                      onChange={() => onGameChange(1)}
                    />
                    <label htmlFor="melee">SSBM</label>
                  </div>
                  <div className={styles.gameCheckbox}>
                    <input
                      name="ultimate"
                      type="checkbox"
                      checked={checkedGames.includes(1386)}
                      onChange={() => onGameChange(1386)}
                    />
                    <label htmlFor="ultimate">SSBU</label>
                  </div>
                  <div className={`${styles.gameCheckbox} ${styles.pPlus}`}>
                    <input
                      name="projectPlus"
                      type="checkbox"
                      checked={checkedGames.includes(33602)}
                      onChange={() => onGameChange(33602)}
                    />
                    <label htmlFor="projectPlus">P+</label>
                  </div>
                </div>
              </div>
            </div>
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
