import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`
    mutation createPlant($plant: PLANT_INPUT!) {
        createPlant(plant: $plant) {
            ...plantDetails
        }
    }
    ${ PLANT_FRAGMENT }
`;
