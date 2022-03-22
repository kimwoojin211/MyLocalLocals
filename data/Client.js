import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const isServer = typeof window === "undefined";
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;
let CLIENT;

export function getApolloClient(forceNew){

	if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      uri: "https://api.smash.gg/gql/alpha",
      cache: new InMemoryCache().restore(windowApolloState || {}),
      headers: {
      authorization: "Bearer " + process.env.NEXT_PUBLIC_SMASHGG_API_KEY,
		}
	});
  }
  return CLIENT;
}


export const QUERY = gql`
query TournamentsByCoordinatesAndGame($coordinates: String!, $radius: String!, $videogames: [ID]!,  $afterDate: Timestamp) {
    tournaments(query: {
      perPage: 500
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