import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Searchbar from './Searchbar';
import ResultsList from './ResultsList';
import Map from './Map';

function SearchControl() {
  const [tournaments, setTournaments] = useState(["Tourney1", "Tourney2"]);

  const handleClick = () => {
    setTournaments(["No tournaments"]);
  }
  
  return (
    <>
      <Searchbar onClick={handleClick}/>
      <ResultsList tournaments={tournaments}/>
      <Map />
    </>
  )
}

export default SearchControl
