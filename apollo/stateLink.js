import cache from './cache';
import gql from 'graphql-tag';
import { withClientState } from 'apollo-link-state';
import CurrentUser from '../graphQL/fragments/CURRENT_USER_FRAGMENT';

export default withClientState({
    cache,
    resolvers: {
        Query:  {
            currentUser: ( _, __, {cache, getCacheKey} ) => {
                const id = getCacheKey({ __typename: 'CurrentUser', id: 'current' });
                const fragment = gql`
                    fragment currentUser on CurrentUser {
                        id
                        token,
                        current_user {
                            ...CurrentUserUser
                        }
                    }
                    ${CurrentUser.fragments.user}
                `;
                return cache.readFragment({
                    id,
                    fragment,
                    fragmentName:'currentUser'
                });
            }
        }
    }
});
