import React, {useState} from 'react';
import styles from "../styles/filters.module.css";
import DatePicker from "react-datepicker";

function Filters(props){
  const {searchRadius, searchGames, searchStartDate, onRadiusChanged, onGameChanged, onStartDateChanged} = props;
  
  function onGameChange(gameId) {
    if (searchGames.includes(gameId)) {
      if (searchGames.length > 1) {
        onGameChanged(searchGames.filter((item) => item !== gameId));
      }
    } else {
      onGameChanged(searchGames.concat([gameId]));
    }
  }

  return(
    <div className={styles.searchFilterContainer}>
      <div className={styles.searchFilters}>
        <div className={styles.radiusFilter}>
          <label htmlFor="radius">Radius </label>
          <select id="radius" onchange="onRadiusChanged(this)">
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
            selected={searchStartDate}
            onChange={(date) => onStartDateChanged(date)}
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
    </div>
  )
}

export default Filters;