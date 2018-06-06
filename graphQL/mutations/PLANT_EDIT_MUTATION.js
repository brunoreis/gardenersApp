import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`
    mutation editPlant($id: ID!, $plant: PLANT_INPUT!) {
        editPlant(id: $id, plant: $plant) {
            ...plantDetails
        }
    }
    ${PLANT_FRAGMENT}
`;
