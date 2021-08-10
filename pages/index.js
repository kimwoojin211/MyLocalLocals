import React from 'react'
import Head from 'next/head'
import SearchControl from '../components/SearchControl'
// import Searchbar from '../components/Searchbar'
// import ResultsList  from '../components/SearchList'
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql,
//   HttpLink,
//   setContext
// } from "@apollo/client";
// import smashggAPIHelper from '../helpers/smashggAPIHelper'

export default function Home() {
  
    // const client = smashggAPIHelper();

    // const SEARCHRESULTS = gql`
    // query TournamentsbyCoordinatesAndGame($perPage: Int, $coordinates: String!, $radius: String!, $videogames: [ID]!) {
    //   tournaments(query: {
    //     perPage: $perPage
    //   filter: {
    //       location: {
    //         distanceFrom: $coordinates,
    //         distance: $radius
    //       }
    //     }
    //   }) {
    //     nodes {
    //       id
    //       name
    //       addrState
    //       venueAddress
    //       city
    //       countryCode
    //       createdAt
    //       events(filter: { videogameId: $videogames }){
    //         id
    //         videogame{
    //           id
    //           name
    //           images{
    //             id
    //             url
    //             height
    //             width
    //             ratio
    //           }
    //         }
    //         startAt
    //         state
    //         numEntrants
    //         entrantSizeMax
    //         type
    //         createdAt
    //       }
    //     }
    //   }
    // },
    // {
    //   "perPage": 10, //allow selectable option for more results (15,20)
    //     "coordinates": "33.7454725,-117.86765300000002", // user input
    //       "radius": "50mi", // 10 mi, 15 mi, 20 mi, 25 mi, 30 mi
    //         "videogames": [1, 1386, 33602, 24, 33945, 33990, 17, 3200, 287, 32] //selectable
    // }
    // `;

    // function SearchResults() {
    //   const { loading, error, data } = useQuery(SEARCHRESULTS);

    //   if (loading) return <p>Loading...</p>;
    //   if (error) return <p>Error :(</p>;

    //   return data.rates.map(({ name }) => (
    //     <div>
    //       <p>
    //         {name}
    //       </p>
    //     </div>
    //   ));
    // }

  return (
    <div className="container">
      <Head>
        <title>My Local Locals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main>
          <SearchControl />
          {/* <Searchbar />
          <ResultsList /> */}
        </main>
    </div>
  )
}
