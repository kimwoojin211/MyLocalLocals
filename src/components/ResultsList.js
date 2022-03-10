import React from "react";
import PropTypes from "prop-types";

function ResultsList(props) {
  const {tournaments}= props;
  // const tournamentList = ["Tourney1","Tourney2"];

  return(
    <>
      <h2>Tournaments!</h2>
      <hr />
      {tournaments.map((tournament,index) =>
        <div key={index}>
          <h1>{tournament}</h1>
        </div>
      )}
      {/* {tournamentList.map((tournament) =>
        <h1>{tournament}</h1>
      )} */}
    </>
  )
}

ResultsList.propTypes = {
  tournaments: PropTypes.array
}

export default ResultsList;