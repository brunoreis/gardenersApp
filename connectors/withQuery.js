import React from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, View } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import QueryErrorMessage from '../components/Errors/QueryErrorMessage';

export default (getConfigs) => (WrappedComponent) => {
    class newClass extends React.Component {
        render() {
            const configValues = (typeof getConfigs === 'function') ? getConfigs(this.props) : getConfigs;
            const extraProps = configValues.extraProps ? configValues.extraProps : {};

            return (
                <Query
                    query={configValues.query}
                    variables={configValues.variables}
                    fetchPolicy="network-only"
                    notifyOnNetworkStatusChange
                >
                    {(queryData) => {
                        const { error } = queryData;
                        const firstTimeLoading = queryData.networkStatus === 1;


                        if (firstTimeLoading) {
                            return <ActivityIndicator size='large' style={{ marginTop: 15 }}/>;
                        }
                        if (error) {
                            return <QueryErrorMessage error={error}/>;
                        }

                        return (
                            <View style={{ flex: 1 }}>
                                <WrappedComponent
                                    {...this.props}
                                    queryData = {queryData}
                                    {...extraProps}
                                />
                            </View>
                        )

                    }}
                </Query>
            );
        }
    }
    return hoistNonReactStatics(newClass, WrappedComponent);
}
