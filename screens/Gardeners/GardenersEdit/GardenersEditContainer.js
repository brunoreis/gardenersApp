import R from 'ramda';
import {withProps} from "recompose";
import GardenerForm from '../GardenersForm';
import withForm from '../../../connectors/withForm';
import withMutation from '../../../connectors/withMutation';
import GARDENER_EDIT_MUTATION from '../../../graphQL/mutations/GARDENER_EDIT_MUTATION';
import withQuery from "../../../connectors/withQuery";
import CURRENT_USER_QUERY from "../../../graphQL/queries/CURRENT_USER_QUERY";

export default R.compose(
    withProps(
        () => ({
            args: {},
            backTo: 'Main',
            screenTitle: 'Minha conta',
            mutationName: 'gardenerEdit',
        })
    ),
    withQuery(
        CURRENT_USER_QUERY
    ),
    withMutation(
        GARDENER_EDIT_MUTATION,
        { name:'gardenerEdit' }
    ),
    withForm({
        defaultData: (props) => {
            const currentUser = props.queryData.data.currentUser.current_user;
            console.log('props', props);
            console.log('currentUser', currentUser);
            return ({
                name: currentUser.name,
                image:  currentUser.image,
                username:  currentUser.username,
                password:  currentUser.password,
                description:  currentUser.description,
                password_confirmation:  currentUser.password_confirmation
            })
        },
        onSubmit: (props) => ({
            ...props.gardenerEdit,
            run: (data) => props.gardenerEditMutate({
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
