import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import HeaderClone from './HeaderClone';
import Fonts from '../../constants/Fonts';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/FormFields/TextField';
import FormStyles from "../../constants/FormStyles";
import Colors from "../../constants/Colors";

class PlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false
        }
    }

    submitForm = () => {
        const {
            form,
            navigation,
            mutationName
        } = this.props;

        this.setState({ submitting: true });
        form.submit.run().then((result) => {
            navigation.navigate('Plant', {
                plantId: result.data[mutationName].id,
                plantName: result.data[mutationName].name,
                plantCreatedById: result.data[mutationName].createdBy.id
            });
        })
    }

    deletePlant = () => {
        const {
            navigation,
            plantDeleteMutate
        } = this.props;
        plantDeleteMutate({
            variables: {
                id: navigation.state.params.plantId,
            }
        }).then(() => {
            navigation.navigate('Plants');
        })
    }

    render() {
        const { submitting } = this.state;
        const {
            args,
            form,
            backTo,
            navigation,
            screenTitle
        } = this.props;
        const { data } = form;
        return (
            <View style={{ flex: 1 }}>
                <HeaderClone
                    title={screenTitle}
                    isSubmiting={submitting}
                    onSavePress={() =>  this.submitForm()}
                    onBackPress={() => navigation.navigate(backTo, args)}
                    saveDisabled={(data.name === '' || data.edible_parts === '' || data.planting_tips === '')}
                />
                <ScrollView>
                    { this.renderFields() }
                </ScrollView>
            </View>
        )
    }


    renderFields() {
        const {
            form,
            mutationName,
        } = this.props;
        console.log('props', this.props);
        return (
            <View style={{ padding: 20, paddingBottom: 0 }}>
                {TextField(
                    'image',
                    'URL da imagem',
                    'Digite a URL da imagem',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('image')
                )}
                {TextField(
                    'name',
                    'Nome*',
                    'Digite o nome da planta',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('name')
                )}
                {TextField(
                    'scientific_name',
                    'Nome cientifico',
                    'Digite o nome científico da planta',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('scientific_name')
                )}
                {TextField(
                    'edible_parts',
                    'Partes comestíveis*',
                    'Digite as partes comestíveis da planta',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('edible_parts')
                )}
                {TextField(
                    'planting_tips',
                    'Dicas de Plantio*',
                    'Digite algumas dicas de plantio da planta',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('planting_tips'),
                    true
                )}
                <Text style={{ ...Fonts.errorMessage, marginTop: -10, marginBottom: 10 }}>
                    { form.generalErrorMessage }
                </Text>
                {
                    mutationName === 'plantEdit' &&
                    <View style={{ marginTop: -10 }}>
                        {
                            this.props.plantDeleteLoading ?
                                <ActivityIndicator
                                    size='large'
                                    color={Colors.red}
                                    style={{ marginBottom: 23 }}
                                />
                                :
                                <View>
                                    <TouchableOpacity
                                        style={FormStyles.deleteButton}
                                        onPress={() => this.deletePlant()}>
                                        <Text style={{ ...Fonts.errorMessage, color: Colors.white }}>
                                            Excluir esta planta
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ ...Fonts.errorMessage, marginTop: -15, marginBottom: 20 }}>
                                        Cuidado! Esta ação é permanente.
                                    </Text>
                                </View>
                        }
                    </View>
                }
            </View>
        )
    }
}

export default withNavigation(PlantForm);
