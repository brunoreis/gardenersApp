import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import LoadingData from '../../../components/LoadingData';
import AmountIcon from '../../../components/AmountIcon';

class PlantItem extends React.Component {
    render() {
        const { plant } = this.props;

        if (plant === undefined) {
            return (
                <LoadingData/>
            )
        }

        return (
            <View style={styles.container}>
                <Image
                    source={
                        { uri: !!plant.image ?
                            plant.image :
                            'https://moto-vision-5d0bnapfypauqr8mw2qu.netdna-ssl.com/img/p/en-default-thickbox.jpg'
                        }
                    }
                    style={
                        (plant.image && plant.image !== null) ?
                            styles.plantPicture :
                            [styles.plantPicture, styles.noPlantPicture]
                    }
                />
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.itemTitle }}>
                        { plant.name.toUpperCase() }
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.ordinaryText }}>
                        { plant.edible_parts }
                    </Text>
                </View>
                <View style={{ flex: 0, width: 80, flexDirection: 'row' }}>
                    <AmountIcon
                        mainIcon={{ name: 'ios-nutrition', type: 'ionicon' }}
                        amount={0}
                    />
                    <View style={{ marginRight: 10 }} />
                    <AmountIcon
                        mainIcon={{ name: 'ios-flower', type: 'ionicon' }}
                        amount={0}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: Colors.veryLightGray
    },
    plantPicture: {
        flex: 0,
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 5
    },
    noPlantPicture: {
        borderWidth: 1,
        borderColor: Colors.lightGray
    }
});

export default PlantItem;
