import gql from 'graphql-tag';

export default gql`
    fragment gardenerDetails on Gardener {
        __typename
        id
        name
        image
        username
        description
    }
`;
