import React from 'react';
import PropTypes from "prop-types";
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
    "videogames": [1 /*, 1386, 33602, 24, 33945, 33990, 17, 3200, 287, 32*/] //selectable games
  };

function SmashggResults(props) {
  const {variables} = props;
  const {data, loading, error} = useQuery(Query, {
    // variables: queryVariables
    variables: variables
  }); 
  // const {tournamentList} = props;
  console.log(`v: ${variables}       d: ${data}   l:${loading}  e:${error}      ` )
  
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

    function onSearchClick(event,tournaments){
      event.preventDefault();
      handleClick(tournaments);
    }

    console.log(`data ${JSON.stringify(data)}`)
    const tournamentList = data.tournaments.nodes;
    // console.log(`tournamentList  ${JSON.stringify(tournamentList)}`);
    // console.log(`tournamentListname ${tournamentList[0].name}`);

    return(
      <div>
      <h2>Tournaments!</h2>
        <hr />
        {
          tournamentList.map((tournament,index) =>
          <div key={index}>
            <p>{tournament.name}</p>
          </div>
        )}
        {/* <ResultsList tournaments={tournamentList}/> */}
      </div>
    )
}

SmashggResults.propTypes = {
  tournamentList: PropTypes.object
}

export default SmashggResults;