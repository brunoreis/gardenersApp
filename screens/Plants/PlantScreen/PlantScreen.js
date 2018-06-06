import React from 'react';
import {
    View,
    Text
} from 'react-native';
import {
    headerStyle,
    renderBackButton,
    renderTitle
} from '../../../components/MainHeader';

export default class PlantScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    PlantScreen
                </Text>
            </View>
        );
    }
}

PlantScreen.navigationOptions = ({ navigation }) => ({
    headerStyle,
    headerTitle: renderTitle('Planta'),
    headerLeft: renderBackButton(navigation),
    headerRight: <View/>
});
