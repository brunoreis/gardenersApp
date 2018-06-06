import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import cache from './cache';
import { getHeaders } from './headers';
import configs from './configs';
import stateLink from './stateLink';
import apolloLogs from './debugger/apolloLogs';
import ApolloDebuggerProvider from './debugger/ApolloDebuggerProvider';

const uri = configs.graphqlEndpoint;
const httpLink = new HttpLink({ uri });
const authLink = setContext(
    ( _ , {headers} )  => ({
        headers: {
            ...headers,
            ...getHeaders()
        }
    })
);

export const client = new ApolloClient({
    link: ApolloLink.from([ stateLink, authLink, httpLink ]),
    cache,
    onError: (a) => console.log('onError',a)
});

export default ({children}) => (
    <ApolloProvider client={client}>
        <ApolloDebuggerProvider logger={apolloLogs}>
            {children}
        </ApolloDebuggerProvider>
    </ApolloProvider>
)
