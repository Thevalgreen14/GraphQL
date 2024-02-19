// apollo/apolloProvider.ts
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from 'vue';

const httpLink = createHttpLink({
	uri: 'https://rickandmortyapi.com/graphql',
});

const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

provide(DefaultApolloClient, apolloClient);
