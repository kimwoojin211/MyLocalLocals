import React from 'react';
import styles from '../styles/tournamentList.module.css';
import TournamentListItem from './TournamentListItem';
import ListGroup from 'react-bootstrap/ListGroup';

function convertTime(timestamp){
  const time = new Date(timestamp);
  const splitTime = time.toTimeString().split(' ').slice(2).join();
  const regex = /[A-Z]/g;
  const timezone = splitTime.match(regex).join('');
  const localTime = time.toLocaleTimeString().split(':');
  const hoursMinutes = localTime.slice(0,2).join(':');
  const combinedTime = hoursMinutes + localTime[2].slice(2);
  return [time.toDateString(), `${combinedTime} ${timezone}`];
}

// function selectImageByRatio(imageArray){
//   if(imageArray.length===0){
//     return "";
//   }
//   if(imageArray.length===1 || imageArray[0].ratio >= imageArray[1].ratio ){
//     return imageArray[0].url;
//   }
//   else{
//     return imageArray[1].url;
//   }
// }


function TournamentList(props){
  const {tournaments, onTournamentSelected, selectedTournamentID} = props;
  console.log(`tournaments: ${JSON.stringify(tournaments)}`);
    console.log(`address1: ${tournaments[0].venueAddress.slice(0,tournaments[0].venueAddress.indexOf(", "))}`);
  console.log(`address2: ${tournaments[0].venueAddress.slice(tournaments[0].venueAddress.indexOf(", ")+2)}`);
    console.log(`selectedTournamentID = ${JSON.stringify(selectedTournamentID)}`);
  return(
    <div className={styles.listContainer}>
      <p>
        {props.tournaments.length > 0? `Click on a tournament to view events`:'No tournaments found. Modify your search and try again.'}
      </p>
      <ListGroup className={styles.listWrapper}>
        
        {/* <ListGroup.Item>        </ListGroup.Item> */}
          {
            tournaments.map((tournament,index) =>
              <TournamentListItem 
                tournament={tournament}
                id={index}
                key={index}
                name={tournament.name}
                url={tournament.url}
                imageURL={tournament.images.length===0 ? "" : (tournament.images.length>1 && (tournament.images[1].ratio>= tournament.images[0].ratio) ? tournament.images[1].url : tournament.images[0].url)}
                venueName={tournament.venueName}
                venueAddress={tournament.venueAddress}
                // venueAddress={`${tournament.venueAddress.slice(0,tournament.venueAddress.indexOf(", ")+2)}${tournament.city}, ${tournament.addrState}`}
                addrState={tournament.addrState}
                startTime={convertTime(tournament.startAt*1000)}
                isRegistrationOpen={tournament.isRegistrationOpen}
                tournamentEvents={tournament.events}
                convertTime={convertTime}
                onTournamentSelected={onTournamentSelected}
                selectedTournamentID={selectedTournamentID}
                />
            )
          }

      </ListGroup>
    </div>
  )
}

export default TournamentList;