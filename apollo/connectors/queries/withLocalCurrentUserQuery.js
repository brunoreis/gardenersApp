import React from 'react';
import { graphql } from 'react-apollo';
import LOCAL_CURRENT_USER_QUERY from '../../../graphQL/queries/LOCAL_CURRENT_USER_QUERY'


export default graphql(
    LOCAL_CURRENT_USER_QUERY,
    { name: 'localCurrentUserQuery' }
)
