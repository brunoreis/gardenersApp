import React from 'react';
import { View } from 'react-native';
import Colors from '../../../constants/Colors';
import PlantEditContainer from './PlantEditContainer';

export default class PlantEditScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <PlantEditContainer />
            </View>
        )
    }
}
