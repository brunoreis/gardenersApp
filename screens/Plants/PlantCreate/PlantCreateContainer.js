import R from 'ramda';
import { withProps } from 'recompose';
import PlantCreateForm from './PlantCreateForm';
import withForm from '../../../connectors/withForm';
import withMutation from '../../../connectors/withMutation';
import PLANT_CREATE_MUTATION from '../../../graphQL/mutations/PLANT_CREATE_MUTATION';

export default R.compose(
    withProps(
        () => ({
            args: {},
            backTo: 'Plants',
            screenTitle: 'Criar uma planta',
            mutationName: 'plantCreate'
        })
    ),
    withMutation(
        PLANT_CREATE_MUTATION,
        { name: 'plantCreate' }
    ),
    withForm({
        defaultData: () => ({
            name: '',
            image: '',
            edible_parts: '',
            planting_tips: '',
            scientific_name: ''
        }),
        onSubmit: (props) => {
            return ({
                ...props.plantCreate,
                run: (data) => props.plantCreateMutate({
                    variables:{
                        plant: {
                            name: data.name,
                            image: data.image,
                            edible_parts: data.edible_parts,
                            planting_tips: data.planting_tips,
                            scientific_name: data.scientific_name
                        }
                    }
                })
            })
        }
    })
)(PlantCreateForm);
