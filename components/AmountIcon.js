import React from 'react';
import {
    View,
    Text,
    StyleSheet
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
            <View style={{ height: 35 }}>
                <View style={styles.mainIcon}>
                    <Icon
                        size={20}
                        name={mainIcon.name}
                        type={mainIcon.type}
                        color={Colors.darkGray}
                        iconStyle={{ alignItems: 'center', padding: 5 }}
                    />
                </View>
                <View style={styles.amountIcon}>
                    <Text style={{ ...Fonts.amountOfObjects, alignSelf: 'center', paddingTop: 1 }}>
                        { amount }
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainIcon: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.veryLightGray
    },
    amountIcon: {
        top: -12,
        left: 20,
        zIndex: 2,
        width: 15,
        height: 15,
        borderRadius: 15/2,
        position: 'relative',
        backgroundColor: Colors.primaryBlue
    }
});
