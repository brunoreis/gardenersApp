import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Fonts from '../constants/Fonts';

export default class BlockOfContent extends React.Component {
    render() {
        const {
            title,
            onPress,
            content,
            createdBy
        } = this.props;
        if (!!createdBy) {
            return (
                <View style={{ paddingTop: 30 }}>
                    <Text style={{ ...Fonts.createdBy }}>
                        { title }:
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={{ ...Fonts.links }}>
                                { content.name }
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ ...Fonts.uppercaseSubtitle }}> em {' '}
                            {content.createdAt}
                        </Text>
                    </View>
                </View>
            )
        }

        return (
            <View style={{ paddingTop: 30 }}>
                <Text style={{ ...Fonts.links }}>
                    { title }:
                </Text>
                <Text style={{ ...Fonts.uppercaseSubtitle, marginTop: 5 }}>
                    { content }
                </Text>
            </View>
        );
    }
}
