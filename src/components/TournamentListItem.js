import React from 'react';
import styles from '../styles/tournamentListItem.module.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import TournamentEvents from './TournamentEvents';


function TournamentListItem(props){
  return(
    <React.Fragment>
    <div className={styles.listItemWrapper} onClick= {() => props.onTournamentSelected(props.id)}>
      <div className={styles.itemIndex}>
        <h3>{props.id+1}.</h3>
      </div>
      
      <div className={styles.tournamentDescription}>
        <h3>{props.name}</h3>
        <p>{props.venueName}</p>
        <p>{props.venueAddress}</p>
        <p>{props.startTime}</p>
      </div>

      <div className={styles.smashGG}>
        <Button variant="danger" href={props.tournament.url}>Smash.gg</Button>
        <span style={{fontSize:"0.7rem", alignSelf:'center'}}>Registration {props.tournament.isRegistrationOpen ? 'Open': 'Closed'}</span>
      </div>
    </div>

    <div 
      className={styles.eventListWrapper} 
      style={{display: props.selectedTournamentID === props.id ? 'flex' : 'none'}}
    >
      {
        props.tournamentEvents.map((tournamentEvent,index) =>
          <TournamentEvents
            name={tournamentEvent.name}
            startTime={props.convertTime(tournamentEvent.startAt*1000)}
            numEntrants={tournamentEvent.numEntrants}
            gameImage={tournamentEvent.videogame.images[0].url}

            />
        )
      }
    </div>
    </React.Fragment>
  )
}

export default TournamentListItem;