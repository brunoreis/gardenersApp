import React from 'react';
import R from 'ramda';
import {
    View
} from 'react-native';
import PropTypes from 'prop-types';
import Log from './Log';
class Logs extends React.Component {
    render() {
        const { logger } = this.context
        const logs = logger.getLogs()
        return(
            <View>
                {
                    R.addIndex(R.map)(
                        (log,k) => {
                            return (
                                <Log
                                    key={k}
                                    log={log}
                                />
                            )
                        }
                    )(logs)
                }
            </View>
        );
    }
}

Logs.contextTypes = {
    logger: PropTypes.any
};

export default Logs;
