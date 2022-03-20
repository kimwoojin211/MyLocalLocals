import React from 'react';
import styles from '../styles/tournamentListItem.module.css';
import Button from 'react-bootstrap/Button';

function TournamentListItem(props){
  return(
    <div className={styles.listItemWrapper}>
      <div className={styles.itemIndex}>
        <h3>{props.id+1}.</h3>
      </div>
      
      <div className={styles.tournamentDescription}>
        <h3>{props.name}</h3>
        <p>{props.location}</p>
        {/* <p>{props.tournament.venueAddress.slice(0,props.tournament.venueAddress.indexOf(','))}
        {props.tournament.city}, {props.tournament.addrState}</p> */}
        <p>{props.startTime}</p>
      </div>

      <div className={styles.smashGG}>
        <Button variant="danger" href={props.tournament.url}>Smash.gg</Button>
        <span style={{fontSize:"0.7rem", alignSelf:'center'}}>Registration {props.tournament.isRegistrationOpen ? 'Open': 'Closed'}</span>
      </div>

    </div>
  )
}

export default TournamentListItem;