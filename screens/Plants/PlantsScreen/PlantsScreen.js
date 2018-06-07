import React from 'react';
import { View } from 'react-native';
import PlantListContainer from './PlantListContainer';
import {
    headerLeftIcon,
    headerStyle,
    headerTitle
} from '../../../components/MainHeader';

export default class PlantsScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <PlantListContainer navigation={ navigation }/>
        )
    }
}

PlantsScreen.navigationOptions = ({ navigation }) => ({
    headerStyle,
    headerTitle: headerTitle('Plantas'),
    headerRight: <View/>,
    headerLeft: headerLeftIcon({
        name: 'ios-menu',
        onPress: () =>  navigation.openDrawer()
    })
});
