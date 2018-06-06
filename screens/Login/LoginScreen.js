import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';
import { setToken } from '../../apollo/headers';
import { client } from '../../apollo/ApolloWrap';
import authKeep from '../../lib/authKeep';
import LoginFormContainer from './LoginFormContainer';
import CURRENT_USER_QUERY from '../../graphQL/queries/CURRENT_USER_QUERY';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persistTokenChecked: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        authKeep.retrieve().then((tokenValue) =>  {
            if (tokenValue) {
                setToken(tokenValue);
                return client.query({
                    query: CURRENT_USER_QUERY
                }).then(
                    (currentUserResult) => {
                        if(currentUserResult.data.currentUser && currentUserResult.data.currentUser.current_user) {
                            navigation.navigate('Main');
                        }
                        else {
                            this.setState({ persistTokenChecked:true })
                        }
                    }
                ).catch(
                    (e)=> {
                        console.log('error', e);
                        this.setState({ persistTokenChecked:true })
                    }
                )
            } else {
                this.setState({ persistTokenChecked:true })
            }
        })
    }

    render() {
        const { navigation } = this.props;
        const { persistTokenChecked } = this.state;
        if (persistTokenChecked) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <LoginFormContainer
                        navigateToMain={()=> navigation.navigate('Main')}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator/>
                </View>
            )
        }
    }
}


