import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import TextField from '../../components/FormFields/TextField';
import FormErrorMessage from '../../components/Errors/FormErrorMessage';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import FormStyles from "../../constants/FormStyles";

export default class LoginForm extends React.Component {
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
        const { form } = this.props;
        const { submit } = form;
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
                <FormErrorMessage form={form}/>
                {
                    submit.running ?
                        <ActivityIndicator size='large' style={{ marginBottom: 33 }} color={Colors.lightBlue} />
                        :
                        <TouchableOpacity style={FormStyles.addButton} onPress={ () =>  submit.run() }>
                            <Text style={{ ...Fonts.formButton }}>
                                Entrar
                            </Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}
