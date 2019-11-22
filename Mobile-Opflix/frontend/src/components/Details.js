import React, { Component } from 'react'
import {
    Text,
    Image,
    View,
    StyleSheet,
    FlatList,
    AsyncStorage
} from 'react-native'
import { throwStatement } from '@babel/types';


class Details extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lancamento: {},
            token: ''
        }
    }

    _readItem = async () => {
        this.setState({ token: await AsyncStorage.getItem('@opflix:token') });
    }

    componentDidMount() {
        this._readItem();
        this._listarLancamentos();
    }


    _buscarLancamento = async () => {
        const { navigation } = this.props;
        await fetch("http://192.168.4.233:5000/api/lancamentos/" + await AsyncStorage.getItem('@opflix:idL'))
            .then(response => response.json())
            .then(data => {
                this.setState({ lancamento: data });
            })
            .catch(error => console.log(error))
    };



    render() {
        
        return (
            <View style={{ flex: 1 }}>
            <Image style={{ width: 240, height: 360 }} source={{ uri: 'http://192.168.4.233:5000' + this.state.lancamento.poster }}/>
        </View>
        )
    }
}

export default Details