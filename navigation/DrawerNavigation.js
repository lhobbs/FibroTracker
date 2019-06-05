import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FoodEntry from '../screens/FoodEntry';
import FoodEntries from '../screens/FoodEntries';
import Menu from './DrawerMenu';

var defaultNavOptions = {
  headerStyle: { backgroundColor: Colors.pink },
  headerTintColor: '#FFF'
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const LinksStack = createStackNavigator({
  Links: LinksScreen,
}, {
  navigationOptions: {
    defaultNavOptions
  }
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const FoodStack = createStackNavigator({
  Food: FoodEntries,
  AddFood: FoodEntry,
});

var stack = createStackNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  FoodStack
})

export default createDrawerNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  FoodStack
},
{ 
  contentComponent: Menu,
  drawerWidth: 300,
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {backgroundColor: 'orange'},
    animationEnabled: true
  }),
  defaultHeaderStyle: {backgroundColor: 'blue'}
});
