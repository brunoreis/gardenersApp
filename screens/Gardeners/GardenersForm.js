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

class GardenerForm extends React.Component {
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
        const { form } = this.props;

        this.setState({ submitting: true });
        form.submit.run().then((result) => {
            this.signInUser(result.data.gardenerCreate);
        }).catch((errors) => {
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

    signInUser = (gardener) => {
        const { form, signinMutate } = this.props;
        signinMutate({
            variables: {
                username: gardener.username,
                password: gardener.password
            }
        });
        form.reset();
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
                    saveDisabled={(
                        data.name === '' ||
                        data.username === '' ||
                        data.password === '' ||
                        data.password_confirmation === ''
                    )}
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
                    'Digite seu nome',
                    form.data,
                    form.onChangeForm,
                    this.hasError('nome')
                )}
                {TextField(
                    'description',
                    'Descrição',
                    'Digite uma breve descrição sobre você',
                    form.data,
                    form.onChangeForm,
                    this.hasError('descrição'),
                    true
                )}
                {TextField(
                    'username',
                    'E-mail*',
                    'Digite seu e-mail',
                    form.data,
                    form.onChangeForm,
                    this.hasError('e-mail')
                )}
                {TextField(
                    'password',
                    'Senha*',
                    'Digite sua senha',
                    form.data,
                    form.onChangeForm,
                    this.hasError('A senha'),
                    false, true
                )}
                {TextField(
                    'password_confirmation',
                    'Confirmação de senha*',
                    'Digite novamente a sua senha',
                    form.data,
                    form.onChangeForm,
                    this.hasError('iguais'),
                    false, true
                )}
                {
                    mutationName === 'gardenerEdit' &&
                    <View style={{ marginTop: -10 }}>
                        {
                            this.props.gardenerDeleteLoading ?
                                <ActivityIndicator
                                    size='large'
                                    color={Colors.red}
                                    style={{ marginTop: -10, marginBottom: 52 }}
                                />
                                :
                                <View>
                                    <TouchableOpacity
                                        style={FormStyles.deleteButton}
                                        onPress={() => this.deleteGardener()}>
                                        <Text style={{ ...Fonts.errorMessage, color: Colors.white }}>
                                            Excluir minha conta
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

export default withNavigation(GardenerForm);
