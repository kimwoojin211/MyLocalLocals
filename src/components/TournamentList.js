import React from 'react';
import styles from '../styles/tournamentList.module.css';
import TournamentListItem from './TournamentListItem';
import ListGroup from 'react-bootstrap/ListGroup';

function TournamentList(props){
  const {tournaments, convertTime} = props;
  return(
    <React.Fragment>
      <ListGroup className={styles.listContainer}>
        <ListGroup.Item >
          {
            tournaments.map((tournament,index) =>
                <TournamentListItem 
                  tournament={tournament}
                  id={index}
                  key={index}
                  name={tournament.name}
                  url={tournament.url}
                  location={tournament.venueName ? tournament.venueName : `${tournament.venueAddress.slice(0,tournament.venueAddress.indexOf(", ")+2)}${tournament.city}, ${tournament.addrState}`}
                  // location={tournament.venueAddress}
                  startTime={convertTime(tournament.startAt*1000)}
                  isRegistrationOpen={tournament.isRegistrationOpen}
                  tournamentEvents={tournament.events}

                  />
            )
          }
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  )
}

export default TournamentList;