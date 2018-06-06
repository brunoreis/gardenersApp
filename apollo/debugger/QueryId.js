import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Id from './Id';
class QueryId extends React.Component {
    render() {
        const {query, color} = this.props;
        const queryName = query.document.definitions[0].name.value
        const variables = JSON.stringify(query.variables)
        return (
            <Id
                color={color}
                name={queryName}
                specification={variables}
            />
        )
    }
}

export default QueryId;