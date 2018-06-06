import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import R from 'ramda';
import Panel from './Panel';
import { withApollo } from 'react-apollo';
import Queries from './Queries';
import Mutations from './Mutations';
import Logs from './Logs';
import PropTypes from 'prop-types'

class ApolloDebugger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numQueries: 0,
            tab: 'queries'
        }
    }

    componentDidMount() {
        const { client } = this.props;
    }

    dump = () => {
        const { client } = this.props;
        console.log('client',client);
        const inspector = client.cache.extract(true);
        console.log('inspector',inspector);
    }

    areaButton(value, where) {
        let onPress = null;
        if (typeof where == 'function') {
            onPress = where;
        } else {
            onPress = () => this.navigate(where)
        }
        const actual = this.state.tab === where;
        return (
            <TouchableOpacity
                style={{
                    flex:1,
                    marginHorizontal:2,
                    padding:4,
                    borderWidth:1,
                    borderRadius:4,
                    backgroundColor: actual ? 'rgba(200, 255, 200, 0.7)' : 'rgba(240, 255, 255, 0.7)',
                }}
                onPress={onPress}

            >
                <Text style={{fontSize:12}}>{value}</Text>
            </TouchableOpacity>
        )
    }

    navigate(where) {
        this.setState({
            tab:where
        })
    }

    renderContent() {
        switch(this.state.tab) {
            case 'queries':
                return <Queries/>
            case 'mutations':
                return <Mutations/>
            case 'logs':
                return <Logs/>
            default:
                return <Text>?</Text>
        }
    }


    render() {
        const { client } = this.props;
        const { logger } = this.context;
        return(
            <Panel>
                <View style={{
                    flex:1,
                    backgroundColor: 'rgba(240, 255, 255, 0.5)'
                }}>
                    <View style={{
                        width:'100%',
                        marginTop:20,
                        alignContent:'center',
                        alignItems:'center',
                        flexDirection:'row'
                    }}>
                        {
                            this.areaButton(
                                "Q:" + R.keys(logger.queries).length,
                                'queries'
                            )
                        }
                        {
                            this.areaButton(
                                "M:" + R.keys(logger.queries).length,
                                'mutations'
                            )
                        }
                        {
                            this.areaButton(
                                "L:" + R.keys(logger.getLogs()).length,
                                'logs'
                            )
                        }
                        {
                            this.areaButton(
                                "Dump",
                                ()=>this.dump()
                            )
                        }
                    </View>
                    <ScrollView>
                        {this.renderContent()}
                    </ScrollView>
                </View>
            </Panel>
        )
        ;
    }
}

ApolloDebugger.contextTypes = {
    logger: PropTypes.any
};

export default R.compose(
    withApollo
)(ApolloDebugger);
