import React from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';

export default class TextFieldComponent extends React.Component {
    render() {
        const {
            value,
            label,
            errors,
            onChange,
            multiline,
            placeholder,
            numberOfLines,
            secureTextEntry
        } = this.props;
        const hasError = errors && (errors.length > 0);
        return (
            <View style={{ marginBottom: 20 }}>
                <Text>
                    { label }
                </Text>
                <TextInput
                    value={value}
                    multiline={multiline}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={onChange}
                    placeholder={placeholder || ''}
                    numberOfLines={numberOfLines}
                    secureTextEntry={secureTextEntry}
                    underlineColorAndroid='transparent'
                />
                {hasError &&
                <Text>
                    { errors.join(',') }
                </Text>
                }
            </View>
        );
    }
}
