import React from 'react';
import R from 'ramda';
import {
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import Mutation from './Mutation';


class Mutations extends React.Component {

    render() {
        const { logger } = this.context
        const mutations = logger.getMutations()
        return(
            <View>

                {
                    R.map(
                        (k) => {
                            return (

                                <Mutation
                                    key={k}
                                    mutation={mutations[k]}
                                />
                            )
                        }
                    )(R.keys(mutations))
                }
            </View>
        );
    }
}

Mutations.contextTypes = {
    logger: PropTypes.any
    //https://medium.com/@oieduardorabelo/padr%C3%B5es-em-react-provider-pattern-b520c37ed733
    // @todo: fazer o withLogger
};

export default Mutations;
