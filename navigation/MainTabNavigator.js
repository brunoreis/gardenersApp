import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements';
import PlantsScreen from "../screens/Plants/PlantsScreen/PlantsScreen";
import PlantScreen from "../screens/Plants/PlantScreen/PlantScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LinksScreen from "../screens/LinksScreen";

const initialRouteName = 'Plants';
const renderIcon = (routeName, iconName, focused) => {
    return (
        <Icon
            size={22}
            name={iconName}
            type='ionicon'
            style={{ marginBottom: -3, width: 22 }}
            color={focused ? Colors.primaryBlue : Colors.lightGray}
        />
    );
}


const tabNav = createBottomTabNavigator({
        Plants: {
            screen: createStackNavigator(
                {
                    Plants: {
                        screen: PlantsScreen,
                    },
                    Plant: {
                        screen: PlantScreen,
                    }
                }
            ),
        },
        Links: {
            screen: createStackNavigator(
                {
                    Links: {
                        screen: LinksScreen
                    }
                }
            ),
        },
        Settings: {
            screen: createStackNavigator({
                Settings: {
                    screen: SettingsScreen,
                }
            })
        }
    },
    {
        initialRouteName,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Plants':
                        iconName = `ios-leaf${focused ? '' : '-outline'}`;
                        break;
                    case 'Links':
                        iconName = `ios-link${focused ? '' : '-outline'}`;
                        break;
                    case 'Settings':
                        iconName = `ios-settings${focused ? '' : '-outline'}`;
                        break;
                    default:
                        throw 'not defined'
                }
                return renderIcon(routeName, iconName, focused);
            }
        }),
        tabBarOptions:{
            showLabel: true,
            style: {
                borderTopWidth: 0.5,
                borderTopColor: Colors.mediumGray
            }
        },
        swipeEnabled: false
    });
export default tabNav;
