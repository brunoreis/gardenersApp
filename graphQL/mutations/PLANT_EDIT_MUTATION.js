import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`
    mutation plantEdit($id: ID!, $plant: PLANT_INPUT!) {
        plantEdit(id: $id, plant: $plant) {
            ...plantDetails
        }
    }
    ${PLANT_FRAGMENT}
`;
