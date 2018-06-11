import React from 'react';
import { View } from 'react-native';
import Colors from "../../../constants/Colors";
import GardenersEditContainer from './GardenersEditContainer';

export default class GardenersEditScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <GardenersEditContainer />
            </View>
        );
    }
}
