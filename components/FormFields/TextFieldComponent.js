import React from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import FormStyles from '../../constants/FormStyles';

export default class CustomTextField extends React.Component {
    render() {
        const {
            value,
            label,
            errors,
            onChange,
            multiline,
            blockSize,
            numberOfLines
        } = this.props;

        const hasError = errors && (errors.length > 0);

        const defaultSize = blockSize
            ? [FormStyles.multilineTextField, { height: blockSize }]
            : FormStyles.multilineTextField;

        const typeOfStyle = multiline ? defaultSize : FormStyles.textField;
        const fieldStyle = hasError ? [typeOfStyle, { borderColor: Colors.errorMessage }] : typeOfStyle;
        const labelStyle = hasError ? [FormStyles.label, { color: Colors.errorMessage }] : FormStyles.label;

        return (
            <View style={{ marginBottom: 20 }}>
                <Text style={labelStyle}>
                    { label }
                </Text>
                <TextInput
                    value={value}
                    style={fieldStyle}
                    multiline={multiline}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={onChange}
                    numberOfLines={numberOfLines}
                    underlineColorAndroid='transparent'
                />
                {hasError &&
                <Text style={{...Fonts.ordinaryText, color: Colors.errorMessage}}>
                    { errors.join(',') }
                </Text>
                }
            </View>
        );
    }
}
