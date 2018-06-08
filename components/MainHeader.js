import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../constants/Colors';
import Fonts from "../constants/Fonts";

export const headerStyle = {
    height: 50,
    paddingTop: 17,
    backgroundColor: Colors.primaryBlue,
};

export const headerTitle = (title) => (
    <Text style={styles.headerTitle}>
        { title }
    </Text>
);

export const headerCustomTitle = (component) => {
    return (
        <View style={styles.customHeaderTitle}>
            { component.props.children }
        </View>
    );
}

export const headerRightIcon = ({ onPress, disabled = false, name, color = Colors.white, isButtonText = false }) => {
    const textStyle = [styles.rightIcon, { ...Fonts.createdBy, color, fontSize: 11, width: 35, alignItems: 'flex-end' }];
    return (
        <TouchableOpacity onPress={() => onPress()} disabled={disabled}>
            { isButtonText
                ? <Text style={textStyle}>
                    { name }
                </Text>
                : <Icon
                    size={25}
                    name={name}
                    type='ionicon'
                    color={color}
                    iconStyle={styles.rightIcon}
                />
            }
        </TouchableOpacity>
    );
}

export const headerLeftIcon = ({ onPress, name, color = Colors.azure, isButtonText = false }) => {
    const textStyle = [styles.leftIcon, { ...Fonts.createdBy, color, fontSize: 11, width: 35, alignItems: 'flex-end' }];
    return (
        <TouchableOpacity onPress={() => onPress()}>
            { isButtonText
                ? <Text style={textStyle}>
                    {name}
                </Text>
                : <Icon
                    size={25}
                    name={name}
                    type='ionicon'
                    color={Colors.white}
                    iconStyle={styles.leftIcon}
                />
            }
        </TouchableOpacity>
    );
}

export const renderBackButton = (navigation) => (
    <TouchableOpacity
        style={styles.backButtonArea}
        onPress={() => navigation.goBack()}
    >
        <Icon
            size={25}
            type='ionicon'
            name='ios-arrow-back-outline'
            color={Colors.white}
            iconStyle={styles.backButtonIcon}
        />
    </TouchableOpacity>
);

export default ({ title, hasBackButton }) => ({ navigation }) => {
    const configs = {
        headerStyle,
        headerTitle: headerTitle(title)
    };

    if (hasBackButton) {
        configs.headerLeft = renderBackButton(navigation);
        configs.headerRight = <View style={{ marginLeft: 10 }} />
    }
    return configs;
}

const styles = StyleSheet.create({
    headerTitle:{
        flex: 1,
        fontSize: 15,
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'Open Sans Bold'
    },
    customHeaderTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonArea: {
        paddingTop: 5,
        paddingRight: 30
    },
    backButtonIcon: {
        marginLeft: 16,
        marginRight: 10
    },
    rightIcon: {
        flex: 0,
        width: 25,
        marginLeft: 10,
        marginRight: 16
    },
    leftIcon: {
        flex: 0,
        width: 25,
        marginLeft: 16,
        marginRight: 10,
    },
});
