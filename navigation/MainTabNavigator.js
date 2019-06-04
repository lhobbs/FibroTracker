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

// HomeStack.navigationOptions = {
//   title: 'Fibro Tracker',
//   // defaultNavOptions
// };

const LinksStack = createStackNavigator({
  Links: LinksScreen,
}, {
  navigationOptions: {
    defaultNavOptions
  }
});

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Pain Areas',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-body' : 'md-body'}
//     />
//   ),
// };

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

// SettingsStack.navigationOptions = {
//   // defaultNavOptions,
//   title: 'Settings'
// };

const FoodStack = createStackNavigator({
  Food: FoodEntries,
  AddFood: FoodEntry,
});

// FoodStack.navigationOptions = {
//   tabBarLabel: 'Food',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-cafe' : 'md-cafe'}
//     />
//   ),
// };

// export default createBottomTabNavigator({
//   HomeStack,
//   LinksStack,
//   SettingsStack,
//   FoodStack
// });
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
  // navigationOptions: {
  //   headerStyle: {backgroundColor: 'orange'}
  // },
  // defaultNavigationOptions: {
  //   headerStyle: {backgroundColor: 'orange'}
  // }
});
