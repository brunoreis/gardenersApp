import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import TextField from '../../components/FormFields/TextField';
import FormErrorMessage from '../../components/Errors/FormErrorMessage';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { form } = this.props;
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                { this.renderFields() }
                <FormErrorMessage form={form}/>
                { this.renderSubmitButton() }
            </View>
        )
    }

    renderFields() {
        const { form } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {TextField(
                    'username',
                    'Email*',
                    'Email',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('username')
                )}
                {TextField(
                    'password',
                    'Senha*',
                    'Senha',
                    form.data,
                    form.onChangeForm,
                    form.getFieldErrorMessages('password'),
                    true
                )}
            </View>
        )
    }

    renderSubmitButton() {
        const { form: { submit } } = this.props;

        if (submit.running) {
            return (
                <ActivityIndicator
                    size='large'
                    style={{ marginBottom: 30, marginTop: -20 }}
                />
            )
        }
        return (
            <TouchableOpacity onPress={ () =>  submit.run() }>
                <Text>
                    Entrar
                </Text>
            </TouchableOpacity>
        )
    }
}
