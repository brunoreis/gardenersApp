import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import FormStyles from '../../constants/FormStyles';
import { withNavigation } from 'react-navigation';
import TextField from '../../components/FormFields/TextField';
import FormErrorMessage from '../../components/Errors/FormErrorMessage';
import authKeep from "../../lib/authKeep";
import {setToken} from "../../apollo/headers";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }
    submitForm = () => {
        const { form, navigateToMain } = this.props;
        form.submit.run().then(result => {
            const data = result.data.signin;
            if (data.error && data.error.length > 0) {
                this.setState({ error: data.error[0] });
            } else {
                const authToken = data.token;
                setToken(authToken);
                authKeep.keep(authToken);
                navigateToMain();
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#4FAF2F' }}>
                { this.renderHeaderImage() }
                { this.renderFields() }
            </View>
        )
    }

    renderHeaderImage() {
        return (
            <Image
                source={{ uri: 'https://www.plastprime.com/wp-content/uploads/2017/08/IS-banner_30-01.jpg' }}
                style={{ height: 170, width: '100%' }}
            />
        )
    }

    renderFields() {
        const {
            form,
            navigation,
            signinLoading
        } = this.props;
        const { error } = this.state;
        return (
            <View style={{ padding: 20, paddingBottom: 0, backgroundColor: Colors.white }}>
                <Text style={{ ...Fonts.header, marginTop: -10, marginBottom: 20 }}>
                    Jardineiros
                </Text>
                {TextField(
                    'username',
                    'Email',
                    'Digite seu e-mail',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('username')
                )}
                {TextField(
                    'password',
                    'Senha',
                    'Digite sua senha',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('password'),
                    false,
                    true
                )}
                {
                    error !== null &&
                        <Text style={{ ...Fonts.errorMessage, marginTop: -15, marginBottom: 10 }}>
                            { error }
                        </Text>
                }
                <TouchableOpacity onPress={() => navigation.navigate('GardenersCreate')}>
                    <Text style={styles.signup}>
                        Não tem conta? Faça a sua.
                    </Text>
                </TouchableOpacity>
                {
                    signinLoading ?
                        <ActivityIndicator size='large' style={{ marginBottom: 23 }} color={Colors.lightBlue} />
                        :
                        (form.data.username !== '' && form.data.password !== '') ?
                            <TouchableOpacity style={FormStyles.addButton} onPress={() =>  this.submitForm()}>
                                <Text style={{ ...Fonts.formButton }}>
                                    Entrar
                                </Text>
                            </TouchableOpacity>
                            :
                            <View/>
                }
            </View>
        )
    }
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
    signup: {
        ...Fonts.ordinaryText,
        color: Colors.mediumGreen,
        marginBottom: 10,
        textAlign: 'center'
    }
})
