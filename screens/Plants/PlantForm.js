import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import HeaderClone from '../../components/HeaderClone';
import Fonts from '../../constants/Fonts';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/FormFields/TextField';
import FormStyles from "../../constants/FormStyles";
import Colors from "../../constants/Colors";

class PlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
            submitting: false
        }
    }

    isValidURL = (str) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }

    submitForm = () => {
        const {
            form,
            navigation,
            mutationName
        } = this.props;

        this.setState({ submitting: true });
        form.submit.run().then((result) => {
            form.reset();
            navigation.navigate('Plant', {
                plantId: result.data[mutationName].id,
                plantName: result.data[mutationName].name,
                plantCreatedById: result.data[mutationName].createdBy.id
            });
        }).catch(errors => {
            const responseErrors = errors.graphQLErrors[0].message.split(',');
            this.setState({
                submitting: false,
                errors: responseErrors
            });
        })
    }

    hasError = (contains) => {
        const { errors } = this.state;
        return errors && errors.filter(error => error.indexOf(contains) !== -1)[0]
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
        return (
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        {TextField(
                            'image',
                            'URL da imagem',
                            'Digite a URL da imagem',
                            form.data,
                            form.onChangeForm,
                            this.hasError('imagem')
                        )}
                    </View>
                    {
                        this.isValidURL(form.data.image) &&
                        <Image
                            source={{ uri: form.data.image }}
                            style={{ flex: 0, width: 40, height: 40, marginLeft: 8, borderRadius: 5 }}
                        />
                    }
                </View>
                {TextField(
                    'name',
                    'Nome*',
                    'Digite o nome da planta',
                    form.data,
                    form.onChangeForm,
                    this.hasError('existe')
                )}
                {TextField(
                    'scientific_name',
                    'Nome cientifico',
                    'Digite o nome científico da planta',
                    form.data,
                    form.onChangeForm,
                    this.hasError('científico')
                )}
                {TextField(
                    'edible_parts',
                    'Partes comestíveis*',
                    'Digite as partes comestíveis da planta',
                    form.data,
                    form.onChangeForm,
                    this.hasError('comestíveis')
                )}
                {TextField(
                    'planting_tips',
                    'Dicas de Plantio*',
                    'Digite algumas dicas de plantio da planta',
                    form.data,
                    form.onChangeForm,
                    this.hasError('dicas'),
                    true
                )}
                {
                    mutationName === 'plantEdit' &&
                    <View style={{ marginTop: -10 }}>
                        {
                            this.props.plantDeleteLoading ?
                                <ActivityIndicator
                                    size='large'
                                    color={Colors.red}
                                    style={{ marginTop: -10, marginBottom: 52 }}
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
