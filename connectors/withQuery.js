import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import { ActivityIndicator, View } from 'react-native';
import QueryErrorMessage from '../components/Errors/QueryErrorMessage';

export default (query, getConfigs = {}) => (WrappedComponent) => {
    class newClass extends React.Component {
        render() {
            const configValues = (typeof getConfigs === 'function') ? getConfigs(this.props) : getConfigs;
            const extraProps = configValues.extraProps ? configValues.extraProps : {}
            const fp = configValues.fetchPolicy ? configValues.fetchPolicy : "network-only";
            const queryDataNm = configValues.queryDataName ? configValues.queryDataName : "queryData";
            return (
                <Query
                    query={query}
                    variables={configValues.variables}
                    fetchPolicy={fp}
                    notifyOnNetworkStatusChange
                >
                    {(queryData) => {
                        const { error } = queryData;

                        if (error) {
                            return <QueryErrorMessage error={error}/>;
                        } else if (!configValues.bypassActivityIndicator && Object.keys(queryData.data).length === 0 ) {
                            return <ActivityIndicator size='large' style={{ marginTop: 15 }}/>;
                        }

                        extraProps[queryDataNm] = queryData;
                        return (
                            <WrappedComponent
                                {...this.props}
                                {...extraProps}
                            />
                        )

                    }}
                </Query>
            );
        }
    }
    return hoistNonReactStatics(newClass, WrappedComponent);
}
