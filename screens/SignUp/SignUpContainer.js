import R from 'ramda';
import authKeep from '../../lib/authKeep';
import GardenerForm from '../Gardeners/GardenersForm';
import {setToken} from '../../apollo/headers';
import withForm from '../../connectors/withForm';
import withMutation from '../../connectors/withMutation';
import SIGN_IN_MUTATION from '../../graphQL/mutations/SIGN_IN_MUTATION';
import GARDENER_CREATE_MUTATION from '../../graphQL/mutations/GARDENER_CREATE_MUTATION';
import {withProps} from "recompose";

export default R.compose(
    withProps(
        () => ({
            args: {},
            backTo: 'Login',
            screenTitle: 'Criar minha conta',
            mutationName: 'gardenerCreate',
        })
    ),
    withMutation(
        GARDENER_CREATE_MUTATION,
        { name:'gardenerCreate' }
    ),
    withMutation(
        SIGN_IN_MUTATION,
        (props) => ({
            name:'signin',
            update: (cache, data) => {
                const authToken = data.data.signin.token;
                setToken(authToken);
                authKeep.keep(authToken);
                props.navigateToMain()
            }
        })
    ),
    withForm({
        defaultData: () => ({
            name: '',
            image: '',
            username: '',
            password: '',
            description: '',
            password_confirmation: ''
        }),
        onSubmit: (props) => ({
            ...props.gardenerCreate,
            run: (data) => props.gardenerCreateMutate({
                variables:{
                    gardener: {
                        name: data.name,
                        image: data.image,
                        username: data.username,
                        password: data.password,
                        description: data.description,
                        password_confirmation: data.password_confirmation
                    }
                }
            })
        })
    })
)(GardenerForm);
