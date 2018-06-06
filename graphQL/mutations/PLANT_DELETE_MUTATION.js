import gql from 'graphql-tag';

export default gql`
    mutation deletePlant($id: ID!) {
        deletePlant(id: $id) {
            id
        }
    }
`;
