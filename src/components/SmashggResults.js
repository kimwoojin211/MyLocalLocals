import React from 'react';
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";

const Query = gql`
query TournamentsByCoordinatesAndGame($coordinates: String!, $radius: String!, $videogames: [ID]!,  $afterDate: Timestamp) {
    tournaments(query: {
      perPage: 50
      filter: {
        location: {
          distanceFrom: $coordinates
          distance: $radius
        }
        afterDate: $afterDate
        videogameIds: $videogames
      }
    }) {
      nodes {
        id
        name
        addrState
        venueAddress
        city
        countryCode
        startAt
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
        }
      }
    }
  }
`;

// const queryVariables = {
//     "perPage": 10, //allow selectable option for more results (15,20)
//     "coordinates": "33.7454725,-117.86765300000002", // user input
//     "radius": "50mi", // 10 mi, 15 mi, 20 mi, 25 mi, 30 mi
//     "videogames": [ 1, 1386, 33602, /*24, 33945, 33990, 17, 3200, 287, 32*/] //selectable games
//   };

function SmashggResults(props) {
  const {variables} = props;
  const {data, loading, error} = useQuery(Query, {
    variables: variables
  }); 
  // console.log(`v:  ${JSON.stringify(variables)}       d: ${JSON.stringify(data)}   l:${loading}  e:${error}      ` )
  
    if (loading) {
        return (
            <h2>Loading Data...</h2>
        );
    };

    if (error) {
        console.error(error);
        return (
            <h2>No Tournaments found. Please try another location.</h2>
        );
    };
    
    console.log(`data ${JSON.stringify(data)}`)
    const tournamentList = data.tournaments.nodes;
    console.log(`tournamentList  ${JSON.stringify(tournamentList)}`);
    // console.log(`tournamentListname ${tournamentList[0].name}`);

    return(
      <div>
      <h2>Tournaments!</h2>
        <hr />
        {
          tournamentList.map((tournament,index) =>
          <div key={index}>
            <p>{tournament.name}</p>
            <p>{tournament.venueAddress}</p>
            <p>{tournament.city}, {tournament.addrState}</p>
            <p>{Date((tournament.startAt)*1000)}</p>
            {/* +date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds()); */}
            <p>Games Featured: {tournament.events.map((games,index) => 
              <p>{games.videogame.name}</p>
            )}
              {/* {tournament.events[0].videogame.name}*/}
              </p>
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