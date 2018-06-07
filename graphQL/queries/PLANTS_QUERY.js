import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`
    {
        plants {
            pageInfo {
                endCursor
            }
            edges {
                node {
                    ...plantDetails
                }
            }
        }
    }
    ${PLANT_FRAGMENT}
`;
