import React from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import About from './About';
import Feed from './Feed';
import Colors from '../../../constants/Colors';
import LoadingData from "../../../components/LoadingData";
import Fonts from "../../../constants/Fonts";

class Plant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            offset: new Animated.Value(0)
        };
    }

    handleIndexChange = (index) => {
        this.setState({ index });
    };

    render() {
        const { index } = this.state;
        const { plant, loadingComplete } = this.props;
        const newsActive = index === 1 ? styles.activeTab : {};
        const aboutActive = index === 0 ? styles.activeTab : {};
        const newsFont = index === 1 ? { ...Fonts.titleActive } : { ...Fonts.titleInactive };
        const aboutFont = index === 0 ? { ...Fonts.titleActive } : { ...Fonts.titleInactive };
        if (loadingComplete) {
            return (
                <View style={{ flex: 1 }}>
                    { this.renderImage(plant) }
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <TouchableOpacity
                           onPress={() => this.handleIndexChange(0)}
                           style={[styles.tabStyle, aboutActive]}>
                           <Text style={aboutFont}>
                               SOBRE
                           </Text>
                       </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.handleIndexChange(1)}
                            style={[styles.tabStyle, newsActive]}>
                            <Text style={newsFont}>
                                NOVIDADES
                            </Text>
                        </TouchableOpacity>
                    </View>
                    { this.renderScene({ index }) }
                </View>
            );
        }
        return (
            <LoadingData/>
        )
    }

    renderImage(plant) {
        const { index } = this.state;
        if (index === 1) {
            Animated.timing(this.state.offset, {
                toValue: 120,
                duration: 500,
            }).start();
        }
        return (
            <Animated.View>
                <Image
                    source={{
                        uri: (plant && plant.image !== null && plant.image !== '')
                            ? plant.image
                            : 'https://moto-vision-5d0bnapfypauqr8mw2qu.netdna-ssl.com/img/p/en-default-thickbox.jpg'
                    }}
                    style={{ height: 120, width: Dimensions.get('screen').width }}
                />
            </Animated.View>
        )
    }

    renderScene = ({ index }) => {
        const { plant } = this.props;
        switch (index) {
            case 0:
                return <About plant={plant} />;
            case 1:
                return <Feed plant={plant} />;
            default:
                return null;
        }
    }
}

export default Plant;

const styles = StyleSheet.create({
    tabStyle: {
        flex: 1,
        paddingVertical: 7
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.mediumGray
    }
});
