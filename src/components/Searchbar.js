import React from "react";
import PropTypes from "prop-types";

function Searchbar(props) {
  const {onSearch} = props;

  function searchTournaments(event){
    event.preventDefault(); // don't redirect the page
    console.log('submitted');
    onSearch({
      newPerPage:5,
      newCoordinates: event.target.location.value,
      newRadius: "50mi",
      newVideogames: [1,1386,33602]
    });
  }

  return(
    <form onSubmit={searchTournaments}>
      <label htmlFor="location">Location</label>
      <input id="location" type="text" />
      <button type="submit">Submit!</button>
    </form>
  )
}

Searchbar.propTypes = {
  onClick: PropTypes.func
}
export default Searchbar;