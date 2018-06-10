import React from 'react';
import { View } from 'react-native';
import Colors from "../../constants/Colors";
import SignUpContainer from './SignUpContainer';

export default class SignUpScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <SignUpContainer
                    navigateToMain={()=> navigation.navigate('Main')}
                />
            </View>
        );
    }
}
