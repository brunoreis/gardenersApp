import React from 'react';
import {
    Text,
    View
} from 'react-native';
class Id extends React.Component {
    render() {
        const {color, name, specification} = this.props;

        return (
            <View style={{flex:1, flexDirection: 'row', alignContent: 'flex-end'}}>
                { color ?
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            alignSelf:'center',
                            borderRadius: 6,
                            borderColor: '#999',
                            borderWidth: 1,
                            backgroundColor: color,
                            marginRight: 5,
                        }}
                    /> :
                    null
                }

                <Text style={{marginRight:5}}>
                    {name}
                </Text>
                <Text style={{
                    alignSelf:'center',
                    fontSize:10,
                    color:'#000',
                    fontWeight:'bold'
                }}>
                    {specification}
                </Text>
            </View>
        )
    }
}

export default Id;