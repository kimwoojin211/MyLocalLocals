import React from 'react';
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import TournamentList from './TournamentList';
import {QUERY} from '../../data/Client';

function convertTime(timestamp){
  const time = new Date(timestamp);
  const splitTime = time.toTimeString().split(' ').slice(2).join();
  const regex = /[A-Z]/g;
  const timezone = splitTime.match(regex).join('');
  return `${time.toDateString()} ${time.toLocaleTimeString()} ${timezone}`;
}

function SmashggResults(props) {
  const {variables, onTournamentSelected,selectedTournamentID} = props;
  const {data, loading, error} = useQuery(QUERY, {variables: variables}); 

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

  const queryResults = data.tournaments.nodes;

  return(
    <React.Fragment>
      <TournamentList
        tournaments={queryResults} 
        convertTime={convertTime} 
        onTournamentSelected={onTournamentSelected}
        selectedTournamentID={selectedTournamentID}
        />
    </React.Fragment>
  )
}

SmashggResults.propTypes = {
  tournamentList: PropTypes.object
}

export default SmashggResults;