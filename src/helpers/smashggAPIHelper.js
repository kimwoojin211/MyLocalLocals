const { GraphQLClient } = require('graphql-request');
const smash_endpoint = "https://api.smash.gg/gql/alpha";
const graphQLClient = new GraphQLClient(smash_endpoint, {
  headers: {
    authorization: "Bearer " + process.env.SMASHGG_API_KEY,
  }
});

async function getTournamentsByCoordinatesAndGame(filter) {
const query =
` TournamentsByCoordinatesAndGame($perPage: Int, $coordinates: String!, $radius: String!, $videogames: [ID]!) {
    tournaments(query: {
      perPage: $perPage
      filter: {
        location: {
          distanceFrom: $coordinates,
          distance: $radius
        }
      }
    }) {
      nodes {
        id
        name
        addrState
        venueAddress
        city
        countryCode
        createdAt
        events(filter: { videogameId: $videogames }){
          id
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
          startAt
          state
          numEntrants
          entrantSizeMax
          type
          createdAt
        }
      }
    }
  }
  `;
  const variables = {
    "perPage": 10, //allow selectable option for more results (15,20)
    "coordinates": "33.7454725,-117.86765300000002", // user input
    "radius": "50mi", // 10 mi, 15 mi, 20 mi, 25 mi, 30 mi
    "videogames": [1, 1386, 33602, 24, 33945, 33990, 17, 3200, 287, 32] //selectable
  };

  const data = await graphQLClient.request(query,variables);
}


export default smashggAPIHelper;