import React from 'react';
import { ApolloProvider } from "@apollo/client";
import client from "../components/Client";
import '../styles/global.css';
import '../styles/App.scss';

function MyApp({ Component, pageProps }){
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp;
