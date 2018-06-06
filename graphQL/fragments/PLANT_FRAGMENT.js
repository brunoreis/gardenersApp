import gql from 'graphql-tag';
import GARDENER_FRAGMENT from '../fragments/GARDENER_FRAGMENT';

export default  gql`
    fragment plantDetails on Plant {
        __typename
        id
        name
        image
        edible_parts
        planting_tips
        scientific_name
        createdBy {
            ...gardenerDetails
        }
    }
    ${GARDENER_FRAGMENT}
`
