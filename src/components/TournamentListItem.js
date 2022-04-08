import React from 'react';
import styles from '../styles/tournamentListItem.module.css';
import Button from 'react-bootstrap/Button';
import TournamentEvents from './TournamentEvents';
import ListGroup from 'react-bootstrap/ListGroup';


function TournamentListItem(props){
  const streetEndIndex = props.venueAddress.indexOf(", ");
  const cityAndStateEndIndex = props.venueAddress.indexOf(props.addrState);
  return(
    <ListGroup.Item className={styles.listItemContainer} style={{backgroundImage:`url(${props.imageURL})`}}>
      <div className={styles.overlay}>
        <div className={styles.tournamentWrapper} onClick= {() => props.onTournamentSelected(props.id,props.venueAddress)}>
          <div className={styles.itemIndex}>
            <h3>{props.id+1}.</h3>
          </div>
          
          <div className={styles.tournamentDescriptionContainer}>
            <h3 className={styles.tournamentName}>{props.name}</h3>
            <div className={styles.tournamentDescription}>
              <p>Address: </p>
              <p><span>{props.venueAddress.slice(0,streetEndIndex)},</span>
                  <span>{props.venueAddress.slice(streetEndIndex+2,cityAndStateEndIndex+2)}</span></p>
            </div>
            <div className={styles.tournamentDescription}>
              <p>Starts At:</p>
              <p><span>{props.startTime[0]}</span><span>{props.startTime[1]}</span></p>
            </div>
            {/*<p>{props.startTime}</p> */}
          </div>
          <div className={styles.smashGG}>
            <Button variant="danger" href={props.tournament.url}>Smash.gg</Button>
            <p className={styles.registration}>Registration <span style={{color: (props.tournament.isRegistrationOpen ? 'lightgreen' : 'red')}}>{props.tournament.isRegistrationOpen ? 'Open': 'Closed'}</span></p>
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
      </div>
    </ListGroup.Item>
  )
}

export default TournamentListItem;