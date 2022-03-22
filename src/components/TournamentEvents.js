import React from 'react';
import styles from '../styles/tournamentEvents.module.css'

function TournamentEvents(props){
  return(
    <div className={styles.eventWrapper}>
      <div className={styles.eventDesc}>
        <h6>{props.name}</h6>
        <span>Starts at: {props.startTime}</span>
        <span>Entrants: {props.numEntrants}</span>
      </div>
      <img src={props.gameImage} className={styles.eventImg}/>
    </div>
  )
}

export default TournamentEvents;