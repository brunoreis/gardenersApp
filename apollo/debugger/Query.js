import React from 'react';
import R from 'ramda';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import QueryLog from './QueryLog';
import networkStatus from './networkStatus'
import QueryId from './QueryId';
class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    renderContent() {
        if (!this.state.open) return null;
        const {
            query,
            logs
        } = this.props;
        return (
            <View>
                <Text
                    style={{
                        color:'#090',
                        fontSize:14

                    }}
                >
                    {query.queryString}
                </Text>
                {
                    R.addIndex(R.map)(
                        (log,i) => <QueryLog key={i} log={log}/>
                    )(logs)
                }
            </View>
        )


    }
    toggle() {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        const {query} = this.props;

        const nStatus = networkStatus(query.networkStatus)
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
                    backgroundColor:'rgba(240, 255, 240, 1)'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <QueryId query={query}/>
                    <Text style={{flex:0, width:70, textAlign:'right', fontSize:11}}>
                        {nStatus}
                    </Text>
                </View>
                {this.renderContent()}
            </TouchableOpacity>
        )
    }
}

export default Query;