import React from 'react';
import { useQuery, gql } from "@apollo/client";

const Query = gql`
query TournamentsByCoordinatesAndGame($perPage: Int, $coordinates: String!, $radius: String!, $videogames: [ID]!) {
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

const queryVariables = {
    "perPage": 10, //allow selectable option for more results (15,20)
    "coordinates": "33.7454725,-117.86765300000002", // user input
    "radius": "50mi", // 10 mi, 15 mi, 20 mi, 25 mi, 30 mi
    "videogames": [1, 1386, 33602, 24, 33945, 33990, 17, 3200, 287, 32] //selectable
  };

function SmashggAPI() {
  const {data, loading, error} = useQuery(Query, {
    variables: queryVariables
  }); 
    // console.log(`node env: ${process.env.NODE_ENV}`);
    // console.log(`REACT_APP_SMASHGG_API_KEY: ${process.env.REACT_APP_SMASHGG_API_KEY}`);
    // console.log(`REACT_APP_GOOGLE_MAPS_API_KEY: ${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
    // console.log(`smashggapi key: ${API_KEY}`);


    if (loading) {
        return (
            <h2>Loading Data...</h2>
        );
    };

    if (error) {
        console.error(error);
        return (
            <h2>Sorry, there&apos;s been an error...</h2>
        );
    };

    const {tournaments} = data;
    console.log(tournaments);

    return(
      <div>
        <h1>API FETCH SUCCESS!!!!!!!!!!!!!!!!!!! WHOOOOOOOOOOOOOOOOOOO</h1>
      </div>
    )
}


export default SmashggAPI;