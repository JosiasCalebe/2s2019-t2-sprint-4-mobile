import React, { Component } from 'react'
import {
    Text,
    Image,
    View,
    StyleSheet,
    FlatList,
    AsyncStorage
} from 'react-native'


class List extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lancamentos: [],
            favoritos: [],
            token: ''
        }
    }

    _readItem = async () => {
        let tokenSt = await AsyncStorage.getItem('@opflix:token');
        this.setState({ token: tokenSt });
    }

    _renderItem(item) {
        return (
            <Image style={{ width: 120, height: 180 }} source={{ uri: 'http://192.168.4.233:5000' + item.poster }} />
        )
    }
    componentDidMount() {
        this._readItem();
        this._listarLancamentos();
        this._listarFavoritos();
    }

    _listarLancamentos = async () => {
        await fetch("http://192.168.4.233:5000/api/lancamentos")
            .then(response => response.json())
            .then(data => {
                this.setState({ lancamentos: data });
            })
            .catch(error => console.log(error))
    };

    _listarFavoritos = async () => {
        await fetch("http://192.168.4.233:5000/api/lancamentos/favoritos", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "bearer " + this.state.token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ favoritos: data });
            })
            .catch(error => console.warn(error))
    };



    render() {
        return (
            <View style={{ flex: 1 }}>
            <View>
                <Text>Lançamentos:</Text>
                <FlatList
                    horizontal
                    ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                    keyExtractor={item => item.idLancamento.toString()}
                    renderItem={({ item }) => this._renderItem(item)}
                    data={this.state.lancamentos}
                />
            </View>
            <View>
            <Text>Favoritos:</Text>
            <FlatList
                horizontal
                ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                keyExtractor={item => item.idLancamento.toString()}
                renderItem={({ item }) => this._renderItem(item)}
                data={this.state.favoritos}
            />
            <Text>{this.state.favoritos}</Text>
        </View>
        </View>
        )
    }
}

export default List