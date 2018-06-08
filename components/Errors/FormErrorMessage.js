import { Text } from 'react-native';
import React from 'react';
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
export default (props) => {
    const {form:{submit:{errors}}} = props;
    let errorMessage = null;

    if(errors) {
        if(errors.error) {
            errorMessage = errors.error.join(',');
            return (
                <Text
                    style={{
                        marginTop: -15,
                        marginBottom: 10,
                        ...Fonts.ordinaryText,
                        color: Colors.red
                    }}>
                    {errorMessage}
                </Text>
            )
        } else {
            console.log('errors', errors);
        }
    }
    return null;
}

