import gql from 'graphql-tag';
import GARDENER_FRAGMENT from './GARDENER_FRAGMENT';

const CurrentUser = {};

CurrentUser.fragments = {
    gardener: gql`
        fragment CurrentUserUser on Gardener {
            ...gardenerDetails
        }
        ${GARDENER_FRAGMENT}
    `
};
export default CurrentUser;
