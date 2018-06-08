import React from 'react';
import { View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login/LoginScreen';
import MainDrawerNavigator from './MainDrawerNavigator';
import PlantCreateScreen from '../screens/Plants/PlantCreate/PlantCreateScreen';
import PlantEditScreen from '../screens/Plants/PlantEdit/PlantEditScreen';

const RootSwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        Main: {
            screen: MainDrawerNavigator,
        },
        PlantCreate: {
            screen: PlantCreateScreen
        },
        PlantEdit: {
            screen: PlantEditScreen
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
