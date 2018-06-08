import React from 'react';
import { View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login/LoginScreen';
import MainDrawerNavigator from "./MainDrawerNavigator";
import PlantCreateScreen from "../screens/Plants/PlantCreate/PlantCreateScreen";

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
