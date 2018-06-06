import gql from 'graphql-tag';
import CURRENT_USER_FRAGMENT from '../fragments/CURRENT_USER_FRAGMENT';

export default gql`
    mutation signin($username: String!, $password: String!) {
        signin(credentials: {
            username: $username,
            password: $password
        }) {
            token
            current_user {
                ...CurrentUserUser
            }
            error
        }
    }
    ${CURRENT_USER_FRAGMENT.fragments.gardener}
`;
