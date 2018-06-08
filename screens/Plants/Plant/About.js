import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import { withNavigation } from 'react-navigation';
import BlockOfContent from '../../../components/BlockOfContent';
import FloatingButton from '../../../components/FloatingButton';
import LoadingData from '../../../components/LoadingData';

class About extends React.Component {
    render() {
        const { plant } = this.props;

        if (plant === undefined) {
            return (
                <LoadingData/>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView>
                    <View style={{ padding: 12 }}>
                        { this.renderNames(plant) }
                        { this.renderDetails(plant) }
                    </View>
                    <View style={{ height: 50 }} />
                </ScrollView>
            </View>
        );
    }

    renderNames(plant) {
        return (
            <View>
                <Text style={{ ...Fonts.itemTitle }}>
                    { plant.name.toUpperCase() }
                </Text>
                <Text style={{ ...Fonts.scientificName }}>
                    { plant.scientific_name }
                </Text>
            </View>
        )
    }

    renderDetails(plant) {
        return (
            <View>
                <BlockOfContent
                    title='Partes comestíveis'
                    content={plant.edible_parts}
                />
                <BlockOfContent
                    title='Dicas de plantio'
                    content={plant.planting_tips}
                />
                <BlockOfContent
                    createdBy={true}
                    title='Criado por'
                    onPress={() => console.log('TODO: Go to selected user.')}
                    content={{ name: plant.createdBy.name, createdAt: plant.created_at }}
                />
            </View>
        )
    }
}

export default withNavigation(About);
