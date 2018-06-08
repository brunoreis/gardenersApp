import React from 'react';
import { View } from 'react-native';
import PlantListContainer from './PlantListContainer';
import {
    headerLeftIcon, headerRightIcon,
    headerStyle,
    headerTitle
} from '../../../components/MainHeader';
import FloatingButton from "../../../components/FloatingButton";

export default class PlantsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <PlantListContainer/>
            </View>
        )
    }
}

PlantsScreen.navigationOptions = ({ navigation }) => ({
    headerStyle,
    headerTitle: headerTitle('Plantas'),
    headerRight: headerRightIcon({
        name: 'md-add',
        onPress: () => navigation.navigate('PlantCreate')
    }),
    headerLeft: headerLeftIcon({
        name: 'ios-menu',
        onPress: () =>  navigation.openDrawer()
    })
});
