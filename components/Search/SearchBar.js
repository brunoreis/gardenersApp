import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard
} from 'react-native';
//import Icon from '../Icon';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        const { text } = this.state;
        const {
            onSearch,
            searchPlaceholder
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    {/*<Icon
                        name='magnifier'
                        size={12}
                        color='rgba(0, 0, 0, 0.3)'
                        style={{ padding: 10, paddingRight: 0 }}
                    />*/}
                    <TextInput
                        value={text}
                        autoFocus={true}
                        autoCorrect={false}
                        placeholder={searchPlaceholder}
                        returnKeyType='search'
                        style={styles.input}
                        blurOnSubmit={false}
                        onSubmitEditing={
                            () => {
                                Keyboard.dismiss();
                                onSearch(this.state.text);
                            }
                        }
                        placeholderTextColor='rgba(0, 0, 0, 0.2)'
                        underlineColorAndroid='transparent'
                        onChangeText={ (value) => this.setState( { text:value } ) }
                    />
                    {
                        text !== '' &&
                        <TouchableOpacity
                            onPress={
                                () => this.setState( { text: '' } )
                            }
                            style={{ padding: 10, paddingLeft: 5 }}
                        >
                            {/*<Icon
                                name='cross-circle'
                                size={12}
                                color={Colors.azure}
                            />*/}
                        </TouchableOpacity>

                    }
                </View>
            </View>
        );
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
