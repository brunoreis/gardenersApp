import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

class HeaderClone extends React.Component {
    render() {
        const {
            title,
            saveDisabled,
            onSavePress,
            onBackPress,
            isSubmiting
        } = this.props;
        const saveColor = saveDisabled ? Colors.lightGray : Colors.white;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onBackPress()}>
                    <Icon
                        size={25}
                        type='ionicon'
                        name='ios-arrow-back-outline'
                        color={Colors.white}
                        iconStyle={{ marginLeft: 16, marginRight: 10 }}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>
                    { title }
                </Text>
                {
                    isSubmiting ?
                        <ActivityIndicator
                            color={Colors.white}
                            style={{ marginLeft: 20, marginRight: 16, }} />
                        :
                        <TouchableOpacity
                            disabled={saveDisabled}
                            onPress={() => onSavePress()}>
                            <Text style={[styles.saveButton, { color: saveColor }]}>
                                Salvar
                            </Text>
                        </TouchableOpacity>
                }
            </View>
        );
    }
}

export default HeaderClone;

const styles = StyleSheet.create({
    container:  {
        height: 75,
        paddingTop: 22,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryBlue
    },
    title: {
        flex: 1,
        fontSize: 15,
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'Open Sans Bold'
    },
    saveButton: {
        ...Fonts.createdBy,
        marginLeft: 10,
        marginRight: 16,
        fontSize: 11,
        alignItems: 'flex-end'
    }
});
