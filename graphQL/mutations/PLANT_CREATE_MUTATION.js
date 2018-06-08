import gql from 'graphql-tag';
import PLANT_FRAGMENT from '../fragments/PLANT_FRAGMENT';

export default gql`
    mutation plantCreate($plant: PLANT_INPUT!) {
        plantCreate(plant: $plant) {
            ...plantDetails
        }
    }
    ${ PLANT_FRAGMENT }
`;
