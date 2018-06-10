import gql from 'graphql-tag';
import GARDENER_FRAGMENT from '../fragments/GARDENER_FRAGMENT';

export default gql`
    mutation gardenerCreate($gardener: GARDENER_INPUT!) {
        gardenerCreate(gardener: $gardener) {
            ...gardenerDetails
        }
    }
    ${ GARDENER_FRAGMENT }
`;
