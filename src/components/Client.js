import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
    uri: "https://api.smash.gg/gql/alpha",
    cache: new InMemoryCache(),
    headers: {
    authorization: "Bearer " + publicRuntimeConfig.SmashGGAPIKey,
    }
});

export default client;