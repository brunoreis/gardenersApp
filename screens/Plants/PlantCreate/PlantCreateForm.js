import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import HeaderClone from '../HeaderClone';
import Fonts from '../../../constants/Fonts';
import { withNavigation } from 'react-navigation';
import TextField from '../../../components/FormFields/TextField';

class PlantCreateForm extends React.Component {
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
            <View>
                <HeaderClone
                    title={screenTitle}
                    isSubmiting={submitting}
                    onSavePress={() =>  this.submitForm()}
                    onBackPress={() => navigation.navigate(backTo, args)}
                    saveDisabled={(data.name === '' || data.edible_parts === '' || data.planting_tips === '')}
                />
                { this.renderFields() }
                <Text style={{ ...Fonts.errorMessage, marginTop: -10, marginBottom: 10 }}>
                    { form.generalErrorMessage }
                </Text>
            </View>
        )
    }


    renderFields() {
        const { form } = this.props;
        return (
            <View style={{ padding: 20 }}>
                <ScrollView>
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
                </ScrollView>
            </View>
        )
    }
}

export default withNavigation(PlantCreateForm);
