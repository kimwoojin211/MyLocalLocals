import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Searchbar from './Searchbar';
import ResultsList from './ResultsList';
import Map from './Map';
import SmashggAPI from './SmashggAPI';
import ClientOnly from './ClientOnly';
import getConfig from 'next/config';

function SearchControl() {
  const [tournaments, setTournaments] = useState(["Tourney1", "Tourney2"]);
  const { publicRuntimeConfig } = getConfig();
  const handleClick = () => {
    setTournaments(["No tournaments"]);
    console.log(`SMASHGG_API_KEY: ${process.env.SMASHGG_API_KEY}`);
    console.log(`GOOGLE_MAPS_API_KEY: ${process.env.GOOGLE_MAPS_API_KEY}`);
    console.log(`REACT_APP_SMASHGG_API_KEY: ${process.env.REACT_APP_SMASHGG_API_KEY}`);
    console.log(`REACT_APP_GOOGLE_MAPS_API_KEY: ${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
    console.log(`NEXT_BUILD_SMASHGG_API_KEY: ${process.env.NEXT_BUILD_SMASHGG_API_KEY}`);
    console.log(`NEXT_BUILD_GOOGLE_MAPS_API_KEY: ${process.env.NEXT_BUILD_GOOGLE_MAPS_API_KEY}`);
    console.log(`SMASHGG: ${publicRuntimeConfig.SmashGGAPIKey}`);
    console.log(`MAPS: ${publicRuntimeConfig.GoogleMapsAPIKey}`);
  }
  
  return (
    <>
      <Searchbar onClick={handleClick}/>
      <ResultsList tournaments={tournaments}/>
      <ClientOnly>
        <SmashggAPI/>
      </ClientOnly>
      <Map />
    </>
  )
}

export default SearchControl
