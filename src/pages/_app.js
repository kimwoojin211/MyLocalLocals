import React from "react";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../../data/Client";
import Header from "../components/Header";
import "../styles/global.css";
import "../styles/App.scss";

function MyApp({ Component, pageProps }){
  const client = getApolloClient();
  
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp;
