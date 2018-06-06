import React from 'react';
import R from 'ramda';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Id from './Id';
import QueryId from './QueryId';
class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    status(value) {
        switch (value) {
            case 1: return 'loading'
            case 2: return 'setVariables'
            case 3: return 'fetchMore'
            case 4: return 'refetch'
            case 6: return 'poll'
            case 7: return 'ready'
            case 8: return 'error'
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
    name() {
        const {log} = this.props;
        switch (log.type) {
            case 'queryListener':
                return (
                    <QueryId query={log.query} color={log.color}/>
                )
                break;
            case 'operation':
            case 'operationResult':
                return (
                    <Id
                        color={log.color}
                        name={log.operation.operationName}
                        specification={JSON.stringify(log.operation.variables) + (log.type=='operationResult' ? ' * ':'')}
                    />
                )
            default:
                return <Text>?</Text>
        }
    }
    render() {
        const {log} = this.props;
        return (
            <TouchableOpacity
                onPress={
                    ()=> this.toggle()
                }
                style={{
                    marginVertical:2,
                    marginHorizontal:2,
                    padding:4,

                    borderWidth:1,
                    borderRadius:4,
                    backgroundColor: log.type == 'queryListener' ? 'rgba(240, 255, 240, 1)' : 'rgba(230, 230, 230, 1)'
                }}
            >
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Text  style={{
                            fontSize:12,
                            marginRight:10,
                            color:'#999'
                        }}>
                            {log.type}
                        </Text>
                        <Text style={{
                            fontSize:12,
                            color: '#009',
                        }}>
                            {this.status(log.networkStatus)}
                        </Text>
                    </View>
                    <Text style={{
                        width:100,
                        fontSize:10,
                        textAlign:'right',
                    }}>
                        {this.time(log.time)}
                    </Text>
                </View>

                {this.name()}

                {this.renderContent()}
            </TouchableOpacity>
        )
    }
}

export default Log;