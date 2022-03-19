import React from 'react';
import Head from 'next/head';
import SearchControl from '../components/SearchControl';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  return (
    <div className="container"> 


      <Head>
        <title>My Local Locals</title>
      </Head>

      {/* <ApolloProvider client={client}> */}
        <main>
          {/* <Header/> */}
          <SearchControl />
          {/* <Searchbar />
          <ResultsList />  */}
        </main>
      {/* </ApolloProvider> */}

    </div>
  )
}
