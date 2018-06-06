import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`
    {
        plants {
            ...plantDetails
        }
    }
    ${PLANT_FRAGMENT}
`;
