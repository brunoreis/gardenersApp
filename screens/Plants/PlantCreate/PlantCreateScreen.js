import React from 'react';
import { View } from 'react-native';
import Colors from '../../../constants/Colors';
import PlantCreateContainer from './PlantCreateContainer';

export default class PlantsCreateScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <PlantCreateContainer />
            </View>
        )
    }
}
