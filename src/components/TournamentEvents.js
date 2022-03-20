import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../styles/tournamentEvents.module.css'

function TournamentEvents(props){
  return(
    <div className={styles.eventWrapper}>
      <div className={styles.eventDesc}>
        <span>{props.name}</span>
        <span>Starts at:</span>
        <span>{props.startTime}</span>
        <span>Entrants: {props.numEntrants}</span>
      </div>
      <img src={props.gameImage} className={styles.eventImg}/>
    </div>
  )
}

export default TournamentEvents;