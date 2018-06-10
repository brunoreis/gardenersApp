import React from 'react';
import { SafeAreaView } from 'react-navigation'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

export default class Drawer extends React.Component {
    render() {
        const { currentUser } = this.props;
        const { current_user } = currentUser;
        return (
            <ScrollView>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    { this.renderUserInfo(current_user) }
                    { this.renderButtons() }
                </SafeAreaView>
            </ScrollView>
        )
    }

    renderUserInfo(current_user) {
        return (
            <View style={styles.content}>
                <Image
                    source={{ uri: current_user.image }}
                    style={styles.picture}
                />
                <Text style={{ ...Fonts.itemTitle, fontSize: 16, marginTop: 10 }}>
                    { current_user.name || 'No Name' }
                </Text>
                <Text style={{ ...Fonts.bigTitles, color: Colors.darkGray, fontSize: 14, marginTop: 8 }}>
                    { current_user.username }
                </Text>
                <Text style={{ ...Fonts.ordinaryText, color: Colors.darkGray,  marginVertical: 15 }}>
                    { current_user.description }
                </Text>
            </View>
        )
    }

    renderButtons() {
        const { logout } = this.props;
        return (
            <View style={{ paddingLeft: 18 }}>
                <TouchableOpacity
                    onPress={() => logout()}
                    style={[ styles.button, styles.logout ]}>
                    <Icon
                        size={18}
                        type='ionicon'
                        name='ios-power-outline'
                        color={Colors.mediumGray}
                        iconStyle={{ marginRight: 15 }}
                    />
                    <Text style={styles.textTitle}>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#EEE',
    },
    picture: {
        width: 90,
        height: 90,
        marginTop: 10,
        borderRadius: 5,
        alignSelf: 'center'
    },
    textTitle: {
        ...Fonts.titleInactive
    },
    button: {
        padding: 10,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logout: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: Colors.lightGray,
        borderBottomColor: Colors.lightGray,
        marginLeft: -18,
        paddingLeft: 28
    }
});
