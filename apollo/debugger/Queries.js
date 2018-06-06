import React from 'react';
import R from 'ramda';
import {
    View
} from 'react-native';
import PropTypes from 'prop-types';
import Query from './Query';

class Queries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            queryLogs:{}
        }
    }




    render() {
        const { logger } = this.context
        const queries = logger.getQueries()
        return(
            <View>

                {
                    R.map(
                        (k) => {
                            return (
                                <Query
                                    key={k}
                                    query={queries[k]}
                                    logs={ logger.getQueryLogs(k) }
                                />
                            )
                        }
                    )(R.keys(queries))
                }
            </View>
        );
    }
}

Queries.contextTypes = {
    logger: PropTypes.any
    //https://medium.com/@oieduardorabelo/padr%C3%B5es-em-react-provider-pattern-b520c37ed733
    // @todo: fazer o withLogger
};

export default Queries;
