import React from 'react';
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import Fonts from '../constants/Fonts';

export default class LoadingData extends React.Component {
    render() {
        return (
            <View style={{ paddingTop: 10, alignItems: 'center' }}>
                <ActivityIndicator size='large' />
                <Text style={{ ...Fonts.uppercaseSubtitle }}>
                    Carregando...
                </Text>
            </View>
        );
    }
}
