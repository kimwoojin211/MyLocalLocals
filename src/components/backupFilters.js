import React, {useState} from 'react';
import styles from "../styles/filters.module.css";
import DatePicker from "react-datepicker";

function Filters(props){
  const {searchRadius, searchGames, searchStartDate, searchEndDate, onRadiusChanged, onGameChanged, onStartDateChanged, onEndDateChanged, onFilterToggle} = props;
  
  function handleGameChange(gameId) {
    if (searchGames.includes(gameId)) {
      if (searchGames.length > 1) {
        onGameChanged(searchGames.filter((item) => item !== gameId));
      }
    } else {
      onGameChanged(searchGames.concat([gameId]));
    }
  }

  function handleFilterClick(){
    onFilterToggle(false);
  }

  return (
    <div className={styles.searchFilterContainer}>
      {/* <a className={styles.filtersToggleBotLeft} onClick={handleFilterClick}>
        Filters
      </a> */}
      {/* <div className={styles.searchFilterColumn}>
        <span>Sort:</span>
        <div className={styles.sortOptions}>
          <input name="sortTime" type="radio" />
          <label htmlFor="sortTime">Time</label>
          <input name="sortDistance" type="radio" />
          <label htmlFor="sortDistance">Dist.</label>
        </div>
      </div> */}
      <div className={styles.searchFilterGroup}>
        <div className={styles.radiusFilter}>
            <label htmlFor="radius">Radius</label>
            <select id="radius" value={searchRadius} onChange={(event) => {onRadiusChanged(event.target.value)}}>
              <option value="10mi">10mi</option>
              <option value="20mi">20mi</option>
              <option value="30mi">30mi</option>
              <option value="40mi">40mi</option>
              <option value="50mi">50mi</option>
              <option value="75mi">75mi</option>
              <option value="100mi">100mi</option>
            </select>
        </div>
        <div className={styles.startDateFilter}>
            <label htmlFor="afterDate">After Date: </label>
            <DatePicker
              selected={searchStartDate}
              onChange={(date) => onStartDateChanged(date)}
              minDate={new Date()}
              highlightDates={[searchStartDate]}
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
        <div className={styles.endDateFilter}>
            <label htmlFor="beforeDate">Before Date: </label>
            <DatePicker
              selected={searchEndDate}
              onChange={(date) => onEndDateChanged(date)}
              minDate={new Date()}
              dateFormat="MM/dd/yy"
              highlightDates={[searchStartDate]}
              isClearable={true}
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
      </div>
      <div className={styles.gameFilters}>
        <label>Games: </label>
        <div className={styles.gameList}>
          <div className={styles.gameCheckbox}>
            <input
              name="melee"
              type="checkbox"
              checked={searchGames.includes(1)}
              onChange={() => handleGameChange(1)}
            />
            <label htmlFor="melee">SSBM</label>
          </div>
          <div className={styles.gameCheckbox}>
            <input
              name="ultimate"
              type="checkbox"
              checked={searchGames.includes(1386)}
              onChange={() => handleGameChange(1386)}
            />
            <label htmlFor="ultimate">SSBU</label>
          </div>
          <div className={styles.gameCheckbox}>
            <input
              name="projectPlus"
              type="checkbox"
              checked={searchGames.includes(33602)}
              onChange={() => handleGameChange(33602)}
            />
            <label htmlFor="projectPlus">P+</label>
          </div>
          <div className={styles.gameCheckbox}>
            <input
              name="ssb64"
              type="checkbox"
              checked={searchGames.includes(4)}
              onChange={() => handleGameChange(4)}
            />
            <label htmlFor="ssb64">SSB64</label>
          </div>
          <div className={styles.gameCheckbox}>
            <input
              name="rivals"
              type="checkbox"
              checked={searchGames.includes(24)}
              onChange={() => handleGameChange(24)}
            />
            <label htmlFor="rivals">RoA</label>
          </div>
          <div className={styles.gameCheckbox}>
            <input
              name="nasb"
              type="checkbox"
              checked={searchGames.includes(39281)}
              onChange={() => handleGameChange(39281)}
            />
            <label htmlFor="nasb">NASB</label>
          </div>
          {/* <div className={`${styles.gameCheckbox} ${styles.brawlhalla}`}>
            <input
              name="brawlhalla"
              type="checkbox"
              checked={searchGames.includes(15)}
              onChange={() => onGameChange(15)}
            />
            <label htmlFor="brawlhalla">BHALLA</label> 
          </div> */}
        </div>
      </div>
  </div>
  );
}

export default Filters;