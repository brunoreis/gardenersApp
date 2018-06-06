import { toIdValue } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const introspectionQueryResultData = {
    '__schema':{
        'types':[
            {
                'kind': 'UNION',
                'name': 'NotificationSource',
                'possibleTypes': [
                    {'name': 'Plant'},
                    {'name': 'Garden'},
                    {'name': 'Recipe'},
                    {'name': 'Gardener'}
                ]
            }
        ]
    }
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const cache = new InMemoryCache({
    fragmentMatcher,
    cacheRedirects: {
        Query: {
            gardener: (_, args) =>
                toIdValue(
                    cache.config.dataIdFromObject(
                        { __typename: 'Gardener', id: args.id }
                    )
                ),
            global: (_, args) =>
                toIdValue(
                    cache.config.dataIdFromObject(
                        { __typename: 'GlobalState', id: args.id }
                    )
                ),
        },
    },
});

export default cache;
