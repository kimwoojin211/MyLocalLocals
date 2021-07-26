import React from "react";
import PropTypes from "prop-types";

function ResultsList(props) {
  const {tournaments}= props;
  // const tournamentList = ["Tourney1","Tourney2"];

  return(
    <>
      <h2>Tournaments!</h2>
      <hr />
      {tournaments.map((tournament) =>
        <h1>{tournament}</h1>
      )}
      {/* {tournamentList.map((tournament) =>
        <h1>{tournament}</h1>
      )} */}
    </>
  )
}

ResultsList.propTypes = {
  tournaments: PropTypes.Array
}

export default ResultsList;