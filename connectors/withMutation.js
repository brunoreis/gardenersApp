import React from 'react';
import { Mutation } from 'react-apollo';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default (mutation, getConfigs = {}) => (WrappedComponent) => {
    class newClass extends React.Component {
        render() {
            const configValues = (typeof getConfigs === 'function') ? getConfigs(this.props) : getConfigs;
            return (
                <Mutation
                    mutation={mutation}
                    variables={configValues.variables}
                    update={configValues.update}
                    optimisticResponse={configValues.optimisticResponse}
                    fetchPolicy="network-only"
                    notifyOnNetworkStatusChange
                >
                    {(run,mutationStuff) => {
                        return (
                            <WrappedComponent
                                {...{
                                    ...this.props,
                                    [configValues.name + "Mutate"]:run,
                                    [configValues.name + "Data"]:mutationStuff.data,
                                    [configValues.name + "Loading"]:mutationStuff.loading,
                                }}
                            />
                        )

                    }}
                </Mutation>
            );
        }
    }
    return hoistNonReactStatics(newClass, WrappedComponent);
}
