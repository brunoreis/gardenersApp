import React from 'react';
import { Text } from 'react-native';

export default ({ error }) => {
    if (error.message) {
        return (
            <Text style={{ marginTop: 15, marginBottom: 10 }}>
                { error.message }
            </Text>
        )
    }
    return null;
}

