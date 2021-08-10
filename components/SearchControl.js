import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import SearchList from './SearchList'; 
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  setContext
} from "@apollo/client";
import smashggAPIHelper from '../helpers/smashggAPIHelper'


function SearchControl() {
  const [tournaments, setTournaments] = useState(["Tourney1", "Tourney2"]);

  const client = smashggAPIHelper();

  const SEARCHDISTANCEANDGAME = gql`
  query TournamentsbyCoordinatesAndGame($perPage: Int, $coordinates: String!, $radius: String!, $videogames: [ID]!) {
    tournaments(query: {
      perPage: $perPage
    filter: {
        location: {
          distanceFrom: $coordinates,
          distance: $radius
        }
      }
    }) {
      nodes {
        id
        name
        addrState
        venueAddress
        city
        countryCode
        createdAt
        events(filter: { videogameId: $videogames }){
          id
          videogame{
            id
            name
            images{
              id
              url
              height
              width
              ratio
            }
          }
          startAt
          state
          numEntrants
          entrantSizeMax
          type
          createdAt
        }
      }
    }
  }
  `;

  const QUERY = {
    "perPage": 10,
    "coordinates": "33.7454725,-117.86765300000002",
    "radius": "50mi",
    "videogames": [1, 1386, 33602, 24, 33945, 33990, 17, 3200, 287, 32]
  }

    function SearchResults({perPage, coordinates, radius, videogames}) {
      const { loading, error, data } = useQuery(SEARCHDISTANCEANDGAME);
      console.log('data = ' + data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.map(({ name }) => (
        <div>
          <p>
            Name: {name}
          </p>
        </div>
      ));
    }

  const handleClick = () => {
    setTournaments(["No tournaments"]);
  }
  
  return (
    <ApolloProvider client={client}>
      <SearchResults />
      <Searchbar onClick={handleClick}/>
      <SearchList tournaments={tournaments}/>
    </ApolloProvider>
  )
}

export default SearchControl
