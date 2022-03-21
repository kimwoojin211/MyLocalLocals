import React from 'react';
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import TournamentCard from './TournamentCard';
import TournamentList from './TournamentList';
import styles from '../styles/smashggresults.module.css';

const Query = gql`
query TournamentsByCoordinatesAndGame($coordinates: String!, $radius: String!, $videogames: [ID]!,  $afterDate: Timestamp) {
    tournaments(query: {
      perPage: 5
      sortBy: "startAt asc"
      filter: {
        location: {
          distanceFrom: $coordinates
          distance: $radius
        }
        afterDate: $afterDate
        videogameIds: $videogames
        hasOnlineEvents: false
      }
    }) {
nodes {
        id
        name
        addrState
        venueAddress
        venueName
        city
        countryCode
        startAt
        timezone
        isRegistrationOpen
        url(relative: false)
        streams{
          enabled
          id
          streamId
          streamSource
        }
        images{
          height
          width
          ratio
          url
        }
        events(filter: { videogameId: $videogames }){
          id   
          name       
          startAt
          state
          numEntrants
          entrantSizeMax
          type
          slug
          videogame{
            id
            name
            images{
              id
              url
              height
              width
              ratio
            }
          }
        }
      }
    }
  }
`;

function convertTime(timestamp){
  const time = new Date(timestamp);
  const splitTime = time.toTimeString().split(' ').slice(2).join();
  const regex = /[A-Z]/g;
  const timezone = splitTime.match(regex).join('');
  // console.log(splitTime);
  // console.log(timezone);
  return `${time.toDateString()} ${time.toLocaleTimeString()} ${timezone}`;
}

function calculateDistance(searchCoordinates, tournamentAddress){

}

function SmashggResults(props) {
  const {variables, onTournamentSelected,selectedTournamentID} = props;
  console.log(JSON.stringify(variables));
  
  // const {data, loading, error} = useQuery(Query, {
  //   variables: variables
  // }); 
  // console.log(`v:  ${JSON.stringify(variables)}       d: ${JSON.stringify(data)}   l:${loading}  e:${error}      ` )
  
  //   if (loading) {
  //       return (
  //           <h2>Loading Data...</h2>
  //       );
  //   };

  //   if (error) {
  //       console.error(error);
  //       return (
  //           <h2>No Tournaments found. Please try another location.</h2>
  //       );
  //   };
  //   console.log(`data ${JSON.stringify(data)}`)
  // const queryResults = data.tournaments.nodes;
    const testTournamentList = [{
          "id": 174838,
          "name": "Genesis 8",
          "addrState": "CA",
          "venueAddress": "150 W San Carlos St, San Jose, CA 95113, USA",
          "venueName": "Oakland Convention Center",
          "city": "San Jose",
          "countryCode": "US",
          "startAt": 1650038400,
          "timezone": "America/Los_Angeles",
          "isRegistrationOpen": true,
          "url": "https://smash.gg/tournament/genesis-8",
          "streams": null,
          "images": [
            {
              "url": "https://images.smash.gg/images/tournament/174838/image-6a34eaa6f44d32ea8c205e264cb14b33.png"
            },
            {
              "url": "https://images.smash.gg/images/tournament/174838/image-bb5b2f64ca474eab029316295d54e064.png"
            }
          ],
          "events": [
            {
              "id": 400198,
              "name": "Ultimate Singles",
              "startAt": 1650042000,
              "state": "CREATED",
              "numEntrants": 1940,
              "entrantSizeMax": 1,
              "type": 1,
              "slug": "tournament/genesis-8/event/ultimate-singles",
              "videogame": {
                "id": 1386,
                "name": "Super Smash Bros. Ultimate",
                "images": [
                  {
                    "id": "4161427",
                    "url": "https://images.smash.gg/images/videogame/1386/image-d24f740623a31f9e1eec2aabc30f4ba2.jpg",
                    "height": 352,
                    "width": 264,
                    "ratio": 0.75
                  },
                  {
                    "id": "4161428",
                    "url": "https://images.smash.gg/images/videogame/1386/image-df8b5408537089162788e68e026dee7b.png",
                    "height": 352,
                    "width": 264,
                    "ratio": 0.75
                  }
                ]
              }
            },
            {
              "id": 400200,
              "name": "Melee Singles",
              "startAt": 1650042000,
              "state": "CREATED",
              "numEntrants": 1511,
              "entrantSizeMax": 1,
              "type": 1,
              "slug": "tournament/genesis-8/event/melee-singles",
              "videogame": {
                "id": 1,
                "name": "Super Smash Bros. Melee",
                "images": [
                  {
                    "id": "4161174",
                    "url": "https://images.smash.gg/images/videogame/1/image-36450d5d1b6f2c693be2abfdbc159106.jpg",
                    "height": 352,
                    "width": 264,
                    "ratio": 0.75
                  },
                  {
                    "id": "4161175",
                    "url": "https://images.smash.gg/images/videogame/1/image-5584f7c210c950a8b2bd65fbb6195f7a.png",
                    "height": 352,
                    "width": 264,
                    "ratio": 0.75
                  }
                ]
              }
            },
            {
              "id": 400199,
              "name": "Ultimate Doubles",
              "startAt": 1650042000,
              "state": "CREATED",
              "numEntrants": 269,
              "entrantSizeMax": 2,
              "type": 5,
              "slug": "tournament/genesis-8/event/ultimate-doubles",
              "videogame": {
                "id": 1386,
                "name": "Super Smash Bros. Ultimate",
                "images": [
                  {
                    "id": "4161427",
                    "url": "https://images.smash.gg/images/videogame/1386/image-d24f740623a31f9e1eec2aabc30f4ba2.jpg",
                    "height": 352,
                    "width": 264,
                    "ratio": 0.75
                  },
                  {
                    "id": "4161428",
                    "url": "https://images.smash.gg/images/videogame/1386/image-df8b5408537089162788e68e026dee7b.png",
                    "height": 352,
                    "width": 264,
                    "ratio": 0.75
                  }
                ]
              }
            },
            {
              "id": 400201,
              "name": "Melee Doubles",
              "startAt": 1650042000,
              "state": "CREATED",
              "numEntrants": 220,
              "entrantSizeMax": 2,
              "type": 5,
              "slug": "tournament/genesis-8/event/melee-doubles",
              "videogame": {
                "id": 1,
                "name": "Super Smash Bros. Melee",
                "images": [
                  {
                    "id": "4161174",
                    "url": "https://images.smash.gg/images/videogame/1/image-36450d5d1b6f2c693be2abfdbc159106.jpg",
                    "height": 352,
                    "width": 264,
                    "ratio": 0.75
                  },
                  {
                    "id": "4161175",
                    "url": "https://images.smash.gg/images/videogame/1/image-5584f7c210c950a8b2bd65fbb6195f7a.png",
                    "height": 352,
                    "width": 264,
                    "ratio": 0.75
                  }
                ]
              }
            }
          ]
        }
      ];
    // console.log(`tournamentList  ${JSON.stringify(tournamentList)}`);
    // console.log(`tournamentListname ${tournamentList[0].name}`);

    return(
      <div className={styles.resultsContainer}>
        {/* <TournamentList tournaments={queryResults}/> */}
        <TournamentList
          tournaments={testTournamentList} 
          convertTime={convertTime} 
          onTournamentSelected={onTournamentSelected}
          selectedTournamentID={selectedTournamentID}/>
        {/* {
          tournamentList.map((tournament,index) =>
          <div key={index} style={{display: 'flex'}}>
            <TournamentCard tournament={tournament} style={{padding:'0 10rem'}}/>
          </div>
        )} */}
      </div>
    )
}

SmashggResults.propTypes = {
  tournamentList: PropTypes.object
}

export default SmashggResults;