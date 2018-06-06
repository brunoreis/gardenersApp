import React from 'react';
import R from 'ramda';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import networkStatus from './networkStatus'

class QueryLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }


    renderContent() {
        if (!this.state.open) return null;
        const {log} = this.props;
        return (
            <View style={{
                marginLeft:20,
                marginTop:5
            }}>
                <Text
                    style={{
                        color:'#009',
                            fontSize:14

                    }}
                >
                    {JSON.stringify(log, null, 4)}
                </Text>
            </View>
        )


    }
    toggle() {
        this.setState({
            open: !this.state.open
        })
    }
    time(dt) {
        return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ':' + dt.getMilliseconds();
    }
    render() {
        const {log} = this.props;
        return (
            <TouchableOpacity
                onPress={
                    ()=> this.toggle()
                }
            >
                <Text style={{
                    fontSize:12,
                    color: '#009'
                }}>
                    {networkStatus(log.networkStatus)} - {this.time(log.time)}
                </Text>
                {this.renderContent()}
            </TouchableOpacity>
        )
    }
}

export default QueryLog;