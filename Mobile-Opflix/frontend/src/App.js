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
  ActivityIndicator
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer'

import { createStackNavigator } from 'react-navigation-stack'

import {
  TabNavigator, createAppContainer, SwitchNavigator, createSwitchNavigator } from 'react-navigation';


import List from './components/List'
import Signin from './components/Signin'
import SideMenu from './components/SideMenu'
import Detalhes from './components/Details'

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
      token: '',
    }
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

export class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._ler();
  }
  _ler = async () => {
    const token = await AsyncStorage.getItem('@opflix:token');
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  }
  
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const SignedOut = createDrawerNavigator(
  {
    Home: {
      screen: App
    },
    Signin: {
      screen: Signin
    }
  },{
    contentComponent: SideMenu,
    initialRouteName: 'Home',
  });

  const SignedIn = createDrawerNavigator(
    {
      Home: {
        screen: App
      },
      Logoff: 'Tela de Logoff'
    },{
      contentComponent: SideMenu,
      initialRouteName: 'Home',
    });

    const AppStackNavigator = createStackNavigator({  
      Details:{
        screen:Detalhes
      },

    },{initialRouteName: 'Details',
  },
        navigationOptions={
          headerMode:'none'
    })
    

    export const RootNavigator = (signedIn = false) => {
      return createSwitchNavigator(
        {
          SignedOutLoading: AuthLoadingScreen,
          App: {
            screen: SignedIn
          },
          Auth: {
            screen: SignedOut
          },
        },
        {
          initialRouteName: signedIn ? "App" : "SignedOutLoading"
        }
      );
    };

    export default createAppContainer(RootNavigator());