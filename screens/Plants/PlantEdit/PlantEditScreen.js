import React from 'react';
import { View } from 'react-native';
import Colors from '../../../constants/Colors';
import PlantEditContainer from './PlantEditContainer';

export default class PlantEditScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <PlantEditContainer navigation={navigation} />
            </View>
        )
    }
}
