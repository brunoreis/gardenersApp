import React from 'react';
import { View } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/Login/LoginScreen';
import { createSwitchNavigator } from 'react-navigation';

const RootSwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        Main: {
            screen: MainTabNavigator,
        }
    }
);

export default class RootNavigator extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <RootSwitchNavigator/>
            </View>
        )
    }
}
