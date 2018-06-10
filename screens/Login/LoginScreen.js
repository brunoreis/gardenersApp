import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';
import { setToken } from '../../apollo/headers';
import { client } from '../../apollo/ApolloWrap';
import authKeep from '../../lib/authKeep';
import LoginContainer from './LoginContainer';
import CURRENT_USER_QUERY from '../../graphQL/queries/CURRENT_USER_QUERY';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasValidToken: true
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
                            this.setState({ hasValidToken: false })
                        }
                    }
                ).catch(
                    (e)=> {
                        console.log('error', e);
                        this.setState({ hasValidToken: false })
                    }
                )
            } else {
                this.setState({ hasValidToken: false })
            }
        })
    }

    render() {
        const { navigation } = this.props;
        const { hasValidToken } = this.state;
        if (hasValidToken) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator/>
                </View>
            )

        }
        return (
            <View style={{ flex: 1 }}>
                <LoginContainer
                    navigateToMain={()=> navigation.navigate('Main')}
                />
            </View>
        )
    }
}


