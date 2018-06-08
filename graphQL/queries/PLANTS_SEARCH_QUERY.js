import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`
    query plantsSearch(
        $first: Int!,
        $after: String,
        $filter: PlantFilter
    ) {
        plants(
            first: $first,
            after: $after,
            filter: $filter
        ) {
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
