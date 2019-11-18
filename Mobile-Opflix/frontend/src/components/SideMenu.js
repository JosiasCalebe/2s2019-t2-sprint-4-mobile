import React, { Component } from 'react';
// import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Alert, AsyncStorage } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';


class SideMenu extends Component {
  _readItem = async (item) => {
    return await AsyncStorage.getItem(item);
  }

  render() {
    return (
      <DrawerItems
        {...this.props}
        onItemPress={(route) => {
          if (route.route.routeName !== 'Logoff') {
            this.props.onItemPress(route);
            return;
          }
          Alert.alert(
            'Logoff',
            'você tem certeza que quer fazer logoff?',
            [
              {
                text: 'Sim', onPress: async () => {
                  await AsyncStorage.clear();
                  this.props.navigation.navigate('Signin');
                }
              },
              {
                text: 'Não',
                style: 'cancel',
              }
            ],
            { cancelable: true });
        }} />
    )
  }
}

export default SideMenu;
