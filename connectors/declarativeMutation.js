import React from 'react';
import R from 'ramda';

export default (config) => (WrappedComponent) => {
    const {
        newMutationPropName,
        mutationName
    } = config;
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                running: false,
                errors: null,
                success: false
            }
        }
        render() {
            const newProps = R.omit(['mutate'],this.props);
            newProps[newMutationPropName] = {
                run: ( payload ) => {
                    this.setState({
                        errors: null,
                        running: true,
                        success: false,
                        result: null
                    });
                    return this.props.mutate(payload).then(
                        (result) => {
                            const resultData = result.data[mutationName];
                            if(resultData && resultData.error) {
                                this.setState({
                                    errors: {
                                        error:resultData.error
                                    },
                                    running: false,
                                    success: false,
                                    result: resultData
                                })
                            }
                            else {
                                this.setState({
                                    errors: null,
                                    running: false,
                                    success: true,
                                    result: resultData
                                })
                            }

                        }
                    ).catch(
                        (error) => {
                            console.log({error});
                            if(error.graphQLErrors && error.graphQLErrors.length > 0) {
                                this.setState({
                                    errors: {
                                        graphQLErrors: error.graphQLErrors
                                    },
                                    running: false,
                                    success: false,
                                    result: null
                                })
                            }
                            else {
                                this.setState({
                                    errors: {
                                        error: config.unknownErrorMessage
                                            ? [config.unknownErrorMessage]
                                            : ['Ops, ocorreu um erro. Favor tentar novamente mais tarde.']
                                    },
                                    running: false,
                                    success: false,
                                    result: null,
                                })
                            }
                        }
                    )
                },
                running: this.state.running,
                success: this.state.success,
                errors: this.state.errors,
                result: this.state.result
            }

            return (
                <WrappedComponent
                    {...newProps}
                    ref={ref => this.wrapped = ref}
                />
            )
        }
    }
}
