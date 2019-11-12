import React, { PureComponent, Component } from 'react'
import { Text, SafeAreaView, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import { HeaderNavigationBar } from '../App'

export default class SignIn extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            email: '',
            senha: ''
        }
    }

    _redirectToMain = async (tokenRecebido) => {
        if (tokenRecebido !== null) {
            try {
                await AsyncStorage.setItem('@opflix:token', tokenRecebido);
                this.props.navigation.navigate('Home');
                console.warn(AsyncStorage.getItem('@opflix:token'))
            } catch (error) { console.warn(error)}
        }
    };

    _handleLogin = async () => {
        await fetch('http://192.168.4.233:5000/api/usuarios/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha,
            }),
        })
            .then(resposta => resposta.json())
            .then(response => this._redirectToMain(response.token))
            .catch(erro => console.warn('deu ruim' + erro));
    };


    render() {
        return (
            <SafeAreaView>
                <HeaderNavigationBar {...this.props} />
                <TextInput
                    placeholder="email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder="senha"
                    secureTextEntry={true}
                    onChangeText={senha => this.setState({ senha })}
                    value={this.state.senha}
                />
                <TouchableOpacity onPress={this._handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}