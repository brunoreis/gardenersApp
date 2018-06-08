import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Colors from '../../../constants/Colors';
import { withNavigation } from 'react-navigation';
import LoadingData from '../../../components/LoadingData';
import Fonts from "../../../constants/Fonts";

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpecialized: false
        };
    }

    render() {
        const { plant } = this.props;
        const { isSpecialized } = this.state;
        const backgroundColor = isSpecialized ? Colors.lightBlue : Colors.white;

        if (plant === undefined) {
            return (
                <LoadingData/>
            )
        }
        return (
            <View style={{ height: '100%', backgroundColor }}>
                <Text style={{ padding: 12, ...Fonts.itemTitle }}>
                    Comentários
                </Text>
            </View>
        );
    }
}

export default (withNavigation)(Feed);
