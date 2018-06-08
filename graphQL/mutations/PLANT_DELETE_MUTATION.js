import gql from 'graphql-tag';

export default gql`
    mutation plantDelete($id: ID!) {
        plantDelete(id: $id) {
            id
        }
    }
`;
