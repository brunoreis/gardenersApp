import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`
    query plantsSearch(
    $first: Int,
    $skip: Int,
    $filter: PlantFilter
    ) {
        plants(
            first: $first,
            skip: $skip,
            filter: $filter
        ) {
            ...plantDetails
        }
    }
    ${PLANT_FRAGMENT}
`;
