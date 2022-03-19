import React from 'react';
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function convertTime(timestamp){
  const time = new Date(timestamp);
  const splitTime = time.toTimeString().split(' ').slice(2).join();
  const regex = /[A-Z]/g;
  const timezone = splitTime.match(regex).join('');
  console.log(splitTime);
  console.log(timezone);
  return `${time.toDateString()} ${time.toLocaleTimeString()} ${timezone}`;
}

function TournamentCards(props){
  const {tournament} = props;
  console.log('awoigoaroh' + JSON.stringify(tournament));
  
  const cardContainerStyle = {
    width: '22rem', 
    border: '1px solid red', 
    borderRadius: '10px',
    borderWidth: '3px'
  }

  const cardImageStyle = {
    width:'100%', 
    borderRadius: '6px'
  }
  
  const eventNameStyle = {
    fontSize: '1.6rem'
  }


  return(
  <Card style={cardContainerStyle}>
    <Card.Img variant="top" src={tournament.images[1].url } style={cardImageStyle} />
    <Card.Header style={{display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", justifyContent:"space-between"}} >
        <Card.Title style= {{fontSize:'1.8rem'}}>
          {tournament.name}
          </Card.Title>
          <div style={{width:'40%', display: "flex", flexDirection: "column"}}>
            <Button variant="danger" href={tournament.url}>Smash.gg</Button>
            <span style={{fontSize:"0.7rem", alignSelf:'center'}}>Registration {tournament.isRegistrationOpen ? 'Open': 'Closed'}</span>
          </div>
      </div>
    {/* </Card.Header>
    <Card.Body style={{padding:'0'}}> */}
      <Card.Text style={{ margin:'0', display:'flex', flexDirection:'column'}}>
        <span>Location:</span> 
        <span>{tournament.venueAddress.slice(0,tournament.venueAddress.indexOf(','))}</span>
        <span>{tournament.city}, {tournament.addrState}</span>
        <span>{convertTime(tournament.startAt*1000)}</span>
        </Card.Text>
    </Card.Header>
      <ListGroup >
          {tournament.events.map((tournamentEvent,index) => 
          <ListGroup.Item action href={'https://smash.gg/' + tournamentEvent.slug}  style={{display: 'flex', justifyContent: 'flex-end', padding:'0'}} >
            <div style={{display: 'flex', flexFlow: 'column wrap', paddingLeft:'10px',flexGrow:'2'}}>
              <span style={eventNameStyle}>{tournamentEvent.name}</span>
              <span>Starts at:</span>
              <span>{convertTime(tournamentEvent.startAt*1000)}</span>
              <span>Entrants: {tournamentEvent.numEntrants}</span>
            </div>
            <img src={tournamentEvent.videogame.images[0].url} style={{width:'22%', padding:'0 0 0 5px',flexGrow:'1'}}></img>
          </ListGroup.Item>
          )}
      </ListGroup>
  </Card>
  )
}

export default TournamentCards;