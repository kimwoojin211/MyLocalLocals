import React from 'react';
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
      <div className={styles.searchFilterGroup}>
        
        <label>Filters</label>
        <div className={styles.searchFilters}>
          <div className={`${styles.radiusFilter} ${styles.filter}`}>
              <label htmlFor="radius">Radius</label>
              <select className={styles.filterSelector} id="radius" value={searchRadius} onChange={(event) => {onRadiusChanged(event.target.value)}}>
                <option value="10mi">10mi</option>
                <option value="20mi">20mi</option>
                <option value="30mi">30mi</option>
                <option value="40mi">40mi</option>
                <option value="50mi">50mi</option>
                <option value="75mi">75mi</option>
                <option value="100mi">100mi</option>
              </select>
          </div>
          <div className={`${styles.startDateFilter} ${styles.filter}`}>
              <label htmlFor="afterDate">From: </label>
              <DatePicker className={styles.filterSelector}
                selected={searchStartDate}
                onChange={(date) => onStartDateChanged(date)}
                minDate={new Date()}
                highlightDates={[searchStartDate]}
                dateFormat="MM/dd"
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
          <div className={`${styles.endDateFilter} ${styles.filter}`}>
              <label htmlFor="beforeDate">To: </label>
              <DatePicker className={styles.filterSelector}
                selected={searchEndDate}
                onChange={(date) => onEndDateChanged(date)}
                minDate={new Date()}
                dateFormat="MM/dd"
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
      </div>
      <div className={styles.gameFilters}>
        <label>Games</label>
        <div className={styles.gameList}>
          
          <div className={`${styles.gameRow}`}>
            <div className={`${styles.gameCheckbox} ${searchGames.includes(1) ? styles.melee : ''}`}>
              <input
                name="melee"
                type="checkbox"
                checked={searchGames.includes(1)}
                onChange={() => handleGameChange(1)}
              />
              <label htmlFor="melee">SSBM</label>
            </div>
            <div className={`${styles.gameCheckbox} ${searchGames.includes(1386)?styles.ultimate: ''}`}>
              <input
                name="ultimate"
                type="checkbox"
                checked={searchGames.includes(1386)}
                onChange={() => handleGameChange(1386)}
              />
              <label htmlFor="ultimate">SSBU</label>
            </div>
            <div className={`${styles.gameCheckbox} ${searchGames.includes(33602)?styles.pPlus: ''}`}>
              <input
                name="projectPlus"
                type="checkbox"
                checked={searchGames.includes(33602)}
                onChange={() => handleGameChange(33602)}
              />
              <label htmlFor="projectPlus">P+</label>
            </div>
          </div>
          
          <div className={`${styles.gameRow}`}>
            <div className={`${styles.gameCheckbox} ${searchGames.includes(463676)?styles.multiversus: ''}`}>
              <input
                name="multiversus"
                type="checkbox"
                checked={searchGames.includes(463676)}
                onChange={() => handleGameChange(463676)}
              />
              <label htmlFor="multiversus">MVSS</label>
            </div>
            <div className={`${styles.gameCheckbox} ${searchGames.includes(39281)?styles.nasb: ''}`}>
              <input
                name="nasb"
                type="checkbox"
                checked={searchGames.includes(39281)}
                onChange={() => handleGameChange(39281)}
              />
              <label htmlFor="nasb">NASB</label>
            </div>
            <div className={`${styles.gameCheckbox} ${searchGames.includes(24)?styles.rivals: ''}`}>
              <input
                name="rivals"
                type="checkbox"
                checked={searchGames.includes(24)}
                onChange={() => handleGameChange(24)}
              />
              <label htmlFor="rivals">RoA</label>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}

export default Filters;