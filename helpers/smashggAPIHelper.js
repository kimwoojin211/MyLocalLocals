import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

function smashggAPIHelper() {

  const httpLink = new HttpLink({ uri: 'https://api.smash.gg/gql/alpha' });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = process.env.SMASHGG_API_KEY;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return client;
}

export default smashggAPIHelper;