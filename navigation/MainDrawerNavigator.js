import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import DrawerContainer from './DrawerContainer';
import PlantEditScreen from "../screens/Plants/PlantEdit/PlantEditScreen";
import PlantCreateScreen from "../screens/Plants/PlantCreate/PlantCreateScreen";
import SignUpScreen from "../screens/SignUp/SignUpScreen";

export default MainDrawerNavigator = createDrawerNavigator(
    {
        TabNavigator: {
            screen: MainTabNavigator
        },
        SignUp: {
            screen: SignUpScreen
        },
        PlantCreate: {
            screen: PlantCreateScreen
        },
        PlantEdit: {
            screen: PlantEditScreen
        }
    },
    {
        contentComponent: DrawerContainer
    }
);

