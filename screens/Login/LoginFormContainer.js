import R from 'ramda';
import LoginForm from './LoginForm';
import configs from '../../apollo/configs';
import { setToken } from '../../apollo/headers';
import withForm from '../../connectors/withForm';
import authKeep from '../../lib/authKeep';
import signinDMutation from '../../apollo/connectors/mutations/signinDMutation';

export default R.compose(
    signinDMutation,
    withForm({
        defaultData: () => ({
            username: configs.defaultUsername ? configs.defaultUsername : '',
            password: configs.defaultPassword ? configs.defaultPassword : ''
        }),
        onSubmit: (props) => ({
            ...props.signin,
            run: (data) => {
                props.signin.run({
                    variables:{
                        username: data.username,
                        password: data.password
                    }
                })
            }
        }),
        onSuccess: (data, props) => {
            const authToken = props.signin.result.token;
            setToken(authToken);
            authKeep.keep(authToken);
            props.navigateToMain()
        }
    })
)(LoginForm);
