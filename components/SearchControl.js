import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ResultsList from './ResultsList';

function SearchControl() {
  const [tournaments, setTournaments] = useState(["Tourney1", "Tourney2"]);

  const handleClick = () => {
    setTournaments(["No tournaments"]);
  }
  
  return (
    <>
      <Searchbar onClick={handleClick}/>
      <ResultsList tournaments={tournaments}/>
    </>
  )
}

export default SearchControl
