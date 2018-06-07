
import React from 'react';
import {
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Drawer from './Drawer';
import { Query } from 'react-apollo';
import authKeep from '../lib/authKeep';
import { setToken } from '../apollo/headers';
import { SafeAreaView } from 'react-navigation';
import CURRENT_USER_QUERY from '../graphQL/queries/CURRENT_USER_QUERY';
import QueryErrorMessage from '../components/Errors/QueryErrorMessage';

const userDataPollInterval = 5000;
export default ({ navigation }) => (
    <Query query={CURRENT_USER_QUERY} pollInterval={userDataPollInterval}>
        {({ loading, error, data, client }) => {
            if (loading) {
                return <ActivityIndicator style={{ marginTop: 15 }}/>;
            }
            if (error) {
                return (
                    <ScrollView>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                            <QueryErrorMessage error={error}/>
                        </SafeAreaView>
                    </ScrollView>
                )
            }
            return (
                <Drawer
                    navigation={navigation}
                    currentUser={data.currentUser}
                    logout={() => {
                        setToken(null);
                        authKeep.clean();
                        navigation.navigate('Login');
                        client.resetStore();
                    }}
                />
            )
        }}
    </Query>
)
