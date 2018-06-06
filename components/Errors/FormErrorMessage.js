import { Text } from 'react-native';
import React from 'react';
export default (props) => {
    const {form:{submit:{errors}}} = props;
    let errorMessage = null;

    if(errors) {
        if(errors.userErrors) {
            console.log('errors.userErrors',errors.userErrors);
            errorMessage = errors.userErrors.join(',');
            return (
                <Text
                    style={{
                        marginTop: -10,
                        marginBottom: 10
                    }}>
                    {errorMessage}
                </Text>
            )
        } else {
            console.log('errors',errors);
        }
    }
    return null;
}

