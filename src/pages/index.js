import React from 'react';
import Head from 'next/head';
import SearchControl from '../components/SearchControl';
import Script from 'next/script';
import dynamic from 'next/dynamic';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="container-fluid"> 
      <Head>
        <title>My Local Locals</title>
      </Head>

        <main className="pageContainer">
          {/* <Header/> */}
          <SearchControl />
        </main>

    </div>
  )
}
