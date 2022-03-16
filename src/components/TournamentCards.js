import React from 'react';
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';

// nodes {
//         id
//         name
//         addrState
//         venueAddress
//         city
//         countryCode
//         startAt
//         events(filter: { videogameId: $videogames }){
//           id
//           videogame{
//             id
//             name
//             images{
//               id
//               url
//               height
//               width
//               ratio
//             }
//           }
//           startAt
//           state
//           numEntrants
//           entrantSizeMax
//           type
//         }
//       }
//     }
//   }

// tournaments: name addrstate venueaddress city countrycode startAt isRegistrationOpen url images.url
// events:
function TournamentCards(props){
  return(
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
            <p>{tournament.name}</p>
            <p>{tournament.venueAddress}</p>
            <p>{tournament.city}, {tournament.addrState}</p>
            <p>{Date((tournament.startAt)*1000)}</p>
            {/* +date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds()); */}
            <p>Games Featured: {tournament.events.map((games,index) => 
              <p>{games.videogame.name}</p>
              )};
            </p>
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  )
}

export default TournamentCards;