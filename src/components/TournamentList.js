import React from 'react';
import styles from '../styles/tournamentList.module.css';
import TournamentListItem from './TournamentListItem';
import ListGroup from 'react-bootstrap/ListGroup';

function TournamentList(props){
  const {tournaments, convertTime, onTournamentSelected, selectedTournamentID} = props;
  console.log(`tournaments: ${tournaments}`)
  return(
    <div className='resultsContainer'>
      <ListGroup className={styles.listContainer}>
        <div style={{display:'flex', justifyContent: 'center', margin:'0 auto', height:'1.5rem', width:'100%', color:'white'}}>
          {props.tournaments.length > 0? 'Click on a tournament to view all relevant events':'No tournaments found. Please modify your selection and try again.'}
        </div>
        
        <ListGroup.Item>
          {
            tournaments.map((tournament,index) =>
              <TournamentListItem 
                tournament={tournament}
                id={index}
                key={index}
                name={tournament.name}
                url={tournament.url}
                imageURL={tournament.images.length>1 && (tournament.images[1].ratio>= tournament.images[0].ratio) ? tournament.images[1].url : tournament.images[0].url}
                venueName={tournament.venueName}
                venueAddress={`${tournament.venueAddress.slice(0,tournament.venueAddress.indexOf(", ")+2)}${tournament.city}, ${tournament.addrState}`}
                startTime={convertTime(tournament.startAt*1000)}
                isRegistrationOpen={tournament.isRegistrationOpen}
                tournamentEvents={tournament.events}
                convertTime={convertTime}
                onTournamentSelected={onTournamentSelected}
                selectedTournamentID={selectedTournamentID}
                />
            )
          }
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default TournamentList;