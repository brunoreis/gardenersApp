import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

export default ({ title, hasBackButton }) => ({ navigation }) => {
    const configs = {
        headerStyle,
        headerTitle: renderTitle(title)
    };

    if (hasBackButton) {
        configs.headerLeft = renderBackButton(navigation);
        configs.headerRight = <View/>;
    }
    return configs;
}

export const renderBackButton = (navigation) => (
    <TouchableOpacity
        style={styles.backButtonArea}
        onPress={() => navigation.goBack()}
    >
        <Icon
            size={17}
            color={Colors.white}
            name='arrow-left'
            type='material-community'
            iconStyle={styles.backButtonIcon}
        />
    </TouchableOpacity>
);

export const renderTitle = (title) => (
    <Text style={styles.headerTitle}>
        { title.toUpperCase() }
    </Text>
);

export const headerStyle = {
    backgroundColor: Colors.tertiaryBlue,
};

const styles = StyleSheet.create({
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: Colors.white
    },
    backButtonArea: {
        paddingTop: 5,
        paddingRight: 30
    },
    backButtonIcon: {
        marginLeft: 16
    }
});
