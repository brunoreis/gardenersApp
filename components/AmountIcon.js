import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements';

export default class AmountIcon extends React.Component {
    render() {
        const {
            amount,
            mainIcon
        } = this.props;
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                    size={15}
                    name={mainIcon.name}
                    type={mainIcon.type}
                    color={Colors.mediumGray}
                    iconStyle={{ alignItems: 'center', padding: 5 }}
                />
                <Text style={{ ...Fonts.amountOfObjects, alignSelf: 'center', paddingTop: 1 }}>
                    { amount }
                </Text>
            </View>
        );
    }
}
