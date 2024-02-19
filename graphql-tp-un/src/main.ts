import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { ApolloProvider } from '@vue/apollo-composable';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const app = createApp(App);

app.use(ApolloProvider(apolloClient));

app.mount('#app');
