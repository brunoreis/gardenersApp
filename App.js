import React from 'react';
import ApolloWrap from './apollo/ApolloWrap';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading, Asset, Font } from 'expo';
import RootNavigation from './navigation/RootNavigation';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <ApolloWrap>
                        <RootNavigation />
                    </ApolloWrap>
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                ...Ionicons.font,
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                "Open Sans Regular": require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
                "Open Sans Semibold": require("./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),
                "Open Sans Bold": require("./assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
                "Open Sans Italic": require("./assets/fonts/Open_Sans/OpenSans-Italic.ttf")
            }),
        ]);
    };

    _handleLoadingError = error => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
