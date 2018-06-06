import R from 'ramda';
import React from 'react';
import { graphql } from 'react-apollo';
import declarativeMutation from '../../../connectors/declarativeMutation';
import SIGN_IN_MUTATION from '../../../graphQL/mutations/SIGN_IN_MUTATION';

export default R.compose(
    graphql(SIGN_IN_MUTATION),
    declarativeMutation({
        newMutationPropName: 'signin',
        mutationName: 'signin',
        unknownErrorMessage: 'Ops. Something got wrong on login.'
    })
)
