import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

export default class FloatingButton extends React.Component {
    render() {
        const {
            icon,
            onPress
        } = this.props;
        return (
            <View style={styles.buttonFixedArea}>
                <TouchableOpacity onPress={onPress} style={styles.iconButton}>
                    <Icon
                        size={20}
                        name={icon.name}
                        type={icon.type}
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonFixedArea: {
        flex: 0,
        bottom: 0,
        zIndex: 2,
        height: 50,
        marginBottom: 10,
        paddingRight: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },
    iconButton: {
        width: 50,
        height: 50,
        padding: 15,
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 1,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: Colors.tertiaryBlue,
    }
});
