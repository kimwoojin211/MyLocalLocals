import React from 'react';
import { ApolloProvider } from "@apollo/client";
import client from "../components/Client";
import '../styles.css';

function MyApp({ Component, pageProps }){
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp;
