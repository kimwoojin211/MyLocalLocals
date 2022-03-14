import React from "react";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';

function Searchbar(props) {
  const {onSearch,variables} = props;
  const {coordinates, radius, videogames, afterDate, beforeDate} = variables;

  function searchTournaments(event){
    event.preventDefault(); // don't redirect the page
    console.log('submitted');
    onSearch({
      // newPerPage:5,
      newCoordinates: event.target.location.value,
      newRadius: "50mi",
      newVideogames: [1]
    });
  }

  return (
    <form onSubmit={searchTournaments}>
      <div>
        <label htmlFor="location">Location</label>
        <input id="location" type="text" />
      </div>
      <div>
      <label htmlFor="radius">Radius</label>
      <select value={radius} id="radius">
        <option default value="10">10mi</option>
        <option value="20">20mi</option>
        <option value="30">30mi</option>
        <option value="40">40mi</option>
        <option value="50">50mi</option>
      </select>
      </div>

      <label htmlFor="afterDate"></label>
      <DatePicker
        selected={Date.now()}
        // onChange={(date) => setStartDate(date)}
        selectsStart
        // startDate={startDate}
        // endDate={endDate}
        id="afterDate"
      />

      <label htmlFor="beforeDate">End Date</label>
      <DatePicker
        // selected={endDate}
        // onChange={(date) => setEndDate(date)}
        selectsEnd
        // startDate={startDate}
        // // endDate={endDate}
        // // minDate={startDate}
        id="beforeDate"
      />
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
    </form>
  );
}

Searchbar.propTypes = {
  onClick: PropTypes.func
}
export default Searchbar;