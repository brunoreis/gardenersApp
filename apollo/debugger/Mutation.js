import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import jsonFormat from 'json-format';
class Mutation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    title(text, color) {
        return (
            <Text style={{
                fontWeight: 'bold',
                fontSize:11,
                color: color
            }}>
                {text}
            </Text>
        );
    }

    renderContent() {
        if (!this.state.open) return null;
        const {
            mutation,
            logs
        } = this.props;
        return (
            <View>
                {this.title('variables', 'purple')}
                <Text style={{color:'purple'}}>
                    {jsonFormat(mutation.variables,{type:'space'})}
                </Text>
                {
                    mutation.error ?
                        <Text>
                            {this.title('error','red')}
                            <Text style={{color:'red'}}>
                                {jsonFormat(mutation.error)}
                            </Text>
                        </Text> :
                        null
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
        const {mutation} = this.props;
        console.log('mutation',mutation);
        //const nStatus = networkStatus(query.networkStatus)
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
                <View>
                    <Text>{mutation.mutationString}</Text>
                </View>
                {this.renderContent()}
            </TouchableOpacity>
        )
    }
}

export default Mutation;