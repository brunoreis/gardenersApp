import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
//import Icon from './Icon';

export const headerStyle = {
    backgroundColor: '#FFF',
    elevation: 1,
    height: 50,
    paddingTop: 17
};

export const headerTitle = (title) => (
    <Text style={styles.headerTitle}>
        { title }
    </Text>
);

export const renderBackButton = (navigation) => (
    <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
    >
        {/*<Icon
            style={Platform.OS === 'ios' ? styles.iOSBackIcon : styles.androidBackIcon}
            name='chevron-left'
            size={24}
            color='#000'
        />*/}
        <Text>
            BACK
        </Text>
    </TouchableOpacity>
);

export default ({ title, hasBackButton }) => ({ navigation }) => {
    const configs = {
        headerStyle,
        headerTitle: headerTitle(title)
    };

    if (hasBackButton) {
        configs.headerLeft = renderBackButton(navigation);
        configs.headerRight = <View/>
    }
    return configs;
}

const styles = StyleSheet.create({
    headerTitle:{
        flex: 1,
        fontSize: 15,
        textAlign: 'center'
    },
    customHeaderTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButton:{
        padding: 5,
        paddingRight: 30,
        height: '100%'
    },
    iOSBackIcon:{
        position: 'relative',
        marginLeft: 16,
        bottom: -5
    },
    androidBackIcon:{
        position: 'relative',
        marginLeft: 16,
        bottom: -7
    },
    rightIcon: {
        position: 'relative',
        bottom: 0,
        marginRight: 16
    },
    leftIcon: {
        position: 'relative',
        bottom: 0,
        marginLeft: 16
    },
});
