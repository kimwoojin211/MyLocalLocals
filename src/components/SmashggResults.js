import React from 'react';
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import TournamentCard from './TournamentCard';
import TournamentList from './TournamentList';
import styles from '../styles/smashggresults.module.css';

const Query = gql`
query TournamentsByCoordinatesAndGame($coordinates: String!, $radius: String!, $videogames: [ID]!,  $afterDate: Timestamp) {
    tournaments(query: {
      perPage: 500
      sortBy: "startAt asc"
      filter: {
        location: {
          distanceFrom: $coordinates
          distance: $radius
        }
        afterDate: $afterDate
        videogameIds: $videogames
        hasOnlineEvents: false
      }
    }) {
nodes {
        id
        name
        addrState
        venueAddress
        venueName
        city
        countryCode
        startAt
        timezone
        isRegistrationOpen
        url(relative: false)
        streams{
          enabled
          id
          streamId
          streamSource
        }
        images{
          height
          width
          ratio
          url
        }
        events(filter: { videogameId: $videogames }){
          id   
          name       
          startAt
          state
          numEntrants
          entrantSizeMax
          type
          slug
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
        }
      }
    }
  }
`;

function convertTime(timestamp){
  const time = new Date(timestamp);
  const splitTime = time.toTimeString().split(' ').slice(2).join();
  const regex = /[A-Z]/g;
  const timezone = splitTime.match(regex).join('');
  // console.log(splitTime);
  // console.log(timezone);
  return `${time.toDateString()} ${time.toLocaleTimeString()} ${timezone}`;
}


function SmashggResults(props) {
  const {variables, onTournamentSelected,selectedTournamentID, currentPage} = props;
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
    const numPages = ((data.tournaments.nodes.length-1)/10)+1;

    const queryResults = data.tournaments.nodes;
    // const queryResults = data.tournaments.nodes.slice(currentPage*10+0,(currentPage+1)*10);

    return(
      <React.Fragment>
        {/* <TournamentList tournaments={queryResults}/> */}
        <TournamentList
          tournaments={queryResults} 
          convertTime={convertTime} 
          onTournamentSelected={onTournamentSelected}
          selectedTournamentID={selectedTournamentID}
          />
        {/* {
          tournamentList.map((tournament,index) =>
          <div key={index} style={{display: 'flex'}}>
            <TournamentCard tournament={tournament} style={{padding:'0 10rem'}}/>
          </div>
        )} */}
      </React.Fragment>
    )
}

SmashggResults.propTypes = {
  tournamentList: PropTypes.object
}

export default SmashggResults;