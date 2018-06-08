import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`    
    query plant($id: ID!) {
        plant(id: $id) {
            __typename
            ...plantDetails
        }
    }
    ${PLANT_FRAGMENT}
`;
