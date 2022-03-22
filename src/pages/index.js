import React from 'react';
import Head from 'next/head';
import SearchControl from '../components/SearchControl';


export default function Home() {
  return (
    <div className="container-fluid bodyContainer"> 
      <Head>
        <title>My Local Locals (beta)</title>
      </Head>

        <main className="pageContainer">
          <SearchControl />
        </main>

    </div>
  )
}
