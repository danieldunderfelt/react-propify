import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const createClient = () => new ApolloClient({
  link: new HttpLink({ uri: 'https://w501j4v7nz.lp.gql.zone/graphql' }),
  cache: new InMemoryCache(),
});