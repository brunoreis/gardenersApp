import gql from "graphql-tag";
import CURRENT_USER_FRAGMENT from '../fragments/CURRENT_USER_FRAGMENT';

export default gql`
    {
        currentUser {
            id
            token,
            current_user {
                ...CurrentUserUser
            }
        }
    }
    ${CURRENT_USER_FRAGMENT.fragments.gardener}
`;
