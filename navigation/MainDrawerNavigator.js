import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import DrawerContainer from './DrawerContainer';
import GardenersCreateScreen from '../screens/Gardeners/GardenersCreate/GardenersCreateScreen';
import PlantCreateScreen from '../screens/Plants/PlantCreate/PlantCreateScreen';
import PlantEditScreen from '../screens/Plants/PlantEdit/PlantEditScreen';
import GardenersEditScreen from '../screens/Gardeners/GardenersEdit/GardenersEditScreen';

export default MainDrawerNavigator = createDrawerNavigator(
    {
        TabNavigator: {
            screen: MainTabNavigator
        },
        GardenersCreate: {
            screen: GardenersCreateScreen
        },
        GardenersEdit: {
            screen: GardenersEditScreen
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

