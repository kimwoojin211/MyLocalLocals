import React from 'react';
import styles from '../styles/tournamentEvents.module.css'

function TournamentEvents(props){
    // console.log(`~~~~~~~~~~~tournament event : ${JSON.stringify(props)}`)
  return(
    <div className={styles.eventWrapper}>
      <div className={styles.eventDesc}>
        <h6>{props.name}</h6>
        <div className={styles.eventTime}>
          <p>Starts At:</p>
          <p><span>{props.startTime[0]}</span><span>{props.startTime[1]}</span></p>
        </div>
        <span>Entrants: {props.numEntrants}</span>
      </div>
      <img src={props.gameImage} className={styles.eventImg}/>
    </div>
  )
}

export default TournamentEvents;