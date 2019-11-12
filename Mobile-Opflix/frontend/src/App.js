import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableHighlight,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer'

import { createAppContainer } from 'react-navigation';


import List from './components/List'
import Signin from './components/Signin'
import SideMenu from './components/SideMenu'

export class HeaderNavigationBar extends Component {
  render() {
    return (<View style={{
      height: 70,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
      <TouchableHighlight style={{ marginLeft: 10, marginTop: 15 }}
        onPress={() => { this.props.navigation.openDrawer() }}>
        <Image
          style={{ width: 32, height: 32 }}
          source={{ uri: 'https://png.icons8.com/ios/2x/menu-filled.png' }}
        />
      </TouchableHighlight>
    </View>);
  }
}


export class App extends Component {

  constructor() {
    super();
    this.state = {
      token : '',
    }
  }

  componentDidMount() {
    this._readItem();
}

  render() {
    return (
      <View style={[{ flex: 1 }]}>
        <HeaderNavigationBar {...this.props} />
        <List />
      </View>
    );
  };
}


_readItem = async () => {
  let tokenSt = await AsyncStorage.getItem('@opflix:token');
  this.setState({ token: tokenSt });
}





export default createAppContainer(createDrawerNavigator((this.state.token !== null) ?
{
  Home: {
    screen: App
  },
  Logoff: 'Tela de Logoff'
} :
{
  Home: {
    screen: App
  },
  Signin: {
    screen: Signin
  },
  Logoff: 'Tela de Logoff'
}
  , {
    contentComponent: SideMenu,
    initialRouteName: 'Home',
  })
);

