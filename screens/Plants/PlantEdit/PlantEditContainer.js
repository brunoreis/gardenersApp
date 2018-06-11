import R from 'ramda';
import { withProps } from 'recompose';
import PlantForm from '../PlantForm';
import withForm from '../../../connectors/withForm';
import withMutation from '../../../connectors/withMutation';
import PLANT_EDIT_MUTATION from '../../../graphQL/mutations/PLANT_EDIT_MUTATION';
import withQuery from "../../../connectors/withQuery";
import PLANT_CACHED_QUERY from "../../../graphQL/queries/PLANT_CACHED_QUERY";
import PLANT_DELETE_MUTATION from "../../../graphQL/mutations/PLANT_DELETE_MUTATION";

export default R.compose(
    withQuery(
        PLANT_CACHED_QUERY,
        (props) => ({
            variables: { id: props.navigation.state.params.plantId },
            fetchPolicy: "cache-only",
            queryDataName: "cachedPlantQueryData"
        })
    ),
    withMutation(
        PLANT_EDIT_MUTATION,
        { name: 'plantEdit' }
    ),
    withMutation(
        PLANT_DELETE_MUTATION,
        { name: 'plantDelete' }
    ),
    withForm({
        defaultData: (props) => ({
            name: props.cachedPlantQueryData.data.plant.name,
            image: props.cachedPlantQueryData.data.plant.image,
            edible_parts: props.cachedPlantQueryData.data.plant.edible_parts,
            planting_tips: props.cachedPlantQueryData.data.plant.planting_tips,
            scientific_name: props.cachedPlantQueryData.data.plant.scientific_name
        }),
        onSubmit: (props) => {
            return ({
                ...props.plantEdit,
                run: (data) => props.plantEditMutate({
                    variables:{
                        id: props.navigation.state.params.plantId,
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
    }),
    withProps(
        (props) => {
            console.log('props', props);
            return ({
                args: {
                    plantId: props.cachedPlantQueryData.data.plant.id,
                    plantName: props.cachedPlantQueryData.data.plant.name,
                    plantCreatedById: props.cachedPlantQueryData.data.plant.createdBy.id
                },
                backTo: 'Plant',
                screenTitle: `Editar ${props.cachedPlantQueryData.data.plant.name}`,
                mutationName: 'plantEdit'
            })
        }
    )
)(PlantForm);
