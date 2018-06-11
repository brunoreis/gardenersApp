import gql from 'graphql-tag';
import GARDENER_FRAGMENT from '../fragments/GARDENER_FRAGMENT';

export default gql`
    mutation gardenerEdit($gardener: GARDENER_INPUT!) {
        gardenerEdit(gardener: $gardener) {
            ...gardenerDetails
        }
    }
    ${ GARDENER_FRAGMENT }
`;
