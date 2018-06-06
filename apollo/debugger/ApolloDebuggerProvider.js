import React from 'react';
import PropTypes from 'prop-types';
class ApolloDebuggerProvider extends React.Component {
    getChildContext() {
        return {
            logger: this.props.logger
        };
    }
    render() {
        return this.props.children;
    }
}
ApolloDebuggerProvider.childContextTypes = {
    logger: PropTypes.any
};
export default ApolloDebuggerProvider;