import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import DrawerContainer from './DrawerContainer';

export default MainDrawerNavigator = createDrawerNavigator(
    {
        TabNavigator: {
            screen: MainTabNavigator
        }
    },
    {
        contentComponent: DrawerContainer
    }
);

