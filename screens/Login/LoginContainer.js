import R from 'ramda';
import LoginForm from './LoginForm';
import withForm from '../../connectors/withForm';
import { setToken } from '../../apollo/headers';
import authKeep from '../../lib/authKeep';
import configs from '../../apollo/configs';
import SIGN_IN_MUTATION from '../../graphQL/mutations/SIGN_IN_MUTATION';
import withMutation from '../../connectors/withMutation';

export default R.compose(
    withMutation(
        SIGN_IN_MUTATION,
        { name:'signin' }
    ),
    withForm({
        defaultData: () => ({
            username: configs.defaultUsername ? configs.defaultUsername : '',
            password: configs.defaultPassword ? configs.defaultPassword : ''
        }),
        onSubmit: (props) => {
            return ({
                ...props.signin,
                run: (data) => props.signinMutate({
                    variables:{
                        username: data.username,
                        password: data.password
                    }
                })
            })
        }
    })
)(LoginForm);
