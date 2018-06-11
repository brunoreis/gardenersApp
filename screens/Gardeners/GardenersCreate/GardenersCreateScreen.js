import React from 'react';
import { View } from 'react-native';
import Colors from "../../../constants/Colors";
import GardenersCreateContainer from './GardenersCreateContainer';

export default class GardenersCreateScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <GardenersCreateContainer
                    navigateToMain={()=> navigation.navigate('Main')}
                />
            </View>
        );
    }
}
