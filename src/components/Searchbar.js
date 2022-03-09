import React from "react";
import PropTypes from "prop-types";
function Searchbar(props) {
  const {onClick} = props;
  const searchTournaments = event => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
  }

  return(
    <form onSubmit={searchTournaments}>
      <label htmlFor="location">Location</label>
      <input id="location" type="text" />
      <button onClick={onClick} type="submit">Submit!</button>
    </form>
  )
}

Searchbar.propTypes = {
  onClick: PropTypes.func
}
export default Searchbar;