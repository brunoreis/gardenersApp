import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import DrawerContainer from './DrawerContainer';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import PlantCreateScreen from '../screens/Plants/PlantCreate/PlantCreateScreen';
import PlantEditScreen from '../screens/Plants/PlantEdit/PlantEditScreen';

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

