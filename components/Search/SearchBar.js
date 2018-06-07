import React from 'react';
import {
    View,
    Text,
    Keyboard,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Fonts from "../../constants/Fonts";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            active: false
        };
    }

    onChange = (value) => {
        this.props.onSearch(value);
        this.setState( { text: value });
    }

    render() {
        const { text } = this.state;
        const {
            active,
            onActivate,
            onCancel,
            searchPlaceholder
        } = this.props;
        const textInput = active ?
            <TextInput
                value={text}
                autoFocus={true}
                autoCorrect={false}
                placeholder={searchPlaceholder}
                returnKeyType='search'
                style={styles.input}
                blurOnSubmit={false}
                onSubmitEditing={() => Keyboard.dismiss()}
                placeholderTextColor='rgba(0, 0, 0, 0.2)'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.onChange(value)}
            /> :
            <Text style={[styles.input, { color: 'rgba(0, 0, 0, 0.2)' }]}>
                {searchPlaceholder}
            </Text>;

        let content = (
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <Icon
                        size={15}
                        type='ionicon'
                        name='ios-search-outline'
                        color='rgba(0, 0, 0, 0.3)'
                        iconStyle={{ padding: 10, paddingRight: 0 }}
                    />
                    {textInput}
                    {
                        text !== '' &&
                        <TouchableOpacity
                            onPress={() => this.onChange('')}
                            style={{ padding: 10, paddingLeft: 5 }}
                        >
                            <Icon
                                size={15}
                                type='ionicon'
                                name='ios-close-circle-outline'
                                color={Colors.mediumGray}
                            />
                        </TouchableOpacity>

                    }
                </View>
                {
                    active &&
                    <TouchableOpacity
                        onPress={() => {
                                this.onChange('');
                                onCancel();
                            }
                        }
                        style={{ flex: 0, width: 43, marginLeft: 8 }}
                    >
                        <Text style={{ ...Fonts.ordinaryTextClear, color: Colors.mediumGray }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                }
            </View>
        );
        if (!active) {
            content = (
                <TouchableOpacity onPress={ () => onActivate() }>
                    {content}
                </TouchableOpacity>
            )
        }
        return content;
    }
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        paddingVertical: 12,
        paddingHorizontal: 17,
        backgroundColor: '#EEE',
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchSection: {
        flex: 1,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },
    input: {
        flex: 1,
        height: 36,
        padding: 10
    }
});
