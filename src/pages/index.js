import React from 'react'
import Head from 'next/head'
import SearchControl from '../components/SearchControl'
import Searchbar from '../components/Searchbar'
import ResultsList  from '../components/ResultsList'
// import smashggAPIHelper from '../helpers/smashggAPIHelper'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  setContext
} from "@apollo/client";

export default function Home() {
  
//   const client = new ApolloClient({
//     uri: 'https://api.smash.gg/gql/alpha?',
//     cache: new InMemoryCache(),
//     headers: {
//     authorization: "Bearer " + process.env.SMASHGG_API_KEY,
//     }
//   });

//   client.query({
//     query: gql` 
//     query TournamentsByCountry($cCode: String!, $perPage: Int!) {
//   tournaments(query: {
//     perPage: $perPage
//     filter: {
//       countryCode: $cCode
//     }
//   }) {
//     nodes {
//       id
//       name
//       countryCode
//     }
//   }
// }
//   `
  // }).then(result => console.log(result));

  return (
    <div className="container">
      <Head>
        <title>My Local Locals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ApolloProvider client={client}> */}
        <main>
          <SearchControl />
          {/* <Searchbar />
          <ResultsList />  */}
        </main>
      {/* </ApolloProvider> */}

    </div>
  )
}
