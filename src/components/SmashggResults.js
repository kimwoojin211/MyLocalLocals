import React from 'react';
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";

const Query = gql`
query TournamentsByCoordinatesAndGame($coordinates: String!, $radius: String!, $videogames: [ID]!,  $afterDate: Timestamp) {
    tournaments(query: {
      perPage: 50
      sortBy: "startAt asc"
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
        isRegistrationOpen
        url
        images{
          url
        }
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

function SmashggResults(props) {
  const {variables} = props;
  console.log(JSON.stringify(variables));
  const {data, loading, error} = useQuery(Query, {
    variables: variables
  }); 
  console.log(`v:  ${JSON.stringify(variables)}       d: ${JSON.stringify(data)}   l:${loading}  e:${error}      ` )
  
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
            <p>{() => {Date(tournament.startAt)}}</p>
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