import React from 'react';
import {
    Text,
    View,
    Button,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visivel: false
        }
    }

    render() {
        const estiloNaoVisivel = {};
        const estiloVisivel = estilos.container;
        const { children } = this.props;
        const { visivel } = this.state;
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({ visivel: true })} style={estilos.debugger}>
                    <Text>
                        DBG
                    </Text>
                </TouchableOpacity>
                <View style={ visivel ? estiloVisivel : estiloNaoVisivel }>
                    <SlidingUpPanel
                        allowDragging={false}
                        ref={c => this._panel = c}
                        visible={visivel}
                        onRequestClose={() => this.setState({ visivel: false })}
                    >
                        <View style={{ flex: 1, paddingTop: 10 }}>
                            { children }
                            <Button title='Fechar' onPress={() => this._panel.transitionTo(0)}/>
                        </View>
                    </SlidingUpPanel>
                </View>
            </View>
        )
    }
}

const { height, width } = Dimensions.get('window');
const estilos = StyleSheet.create({
    debugger: {
        right: 0,
        bottom: 0,
        borderRadius: 3,
        borderColor: 'red',
        position: 'absolute',
        backgroundColor: 'rgba(200, 255, 200, 0.7)'
    },
    container: {
        width,
        height,
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'transparent',
    }
});

export default Panel;
