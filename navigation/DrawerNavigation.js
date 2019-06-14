import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FoodEntry from '../screens/FoodEntry';
import FoodEntries from '../screens/FoodEntries';
import MedicineEntry from '../screens/MedicineEntry';
import MedicineEntries from '../screens/MedicineEntries';
import ActivityEntry from '../screens/ActivityEntry';
import ActivityEntries from '../screens/ActivityEntries';
import SleepEntry from '../screens/SleepEntry';
import PainScale from '../screens/PainScale';
import PainAreas from '../screens/PainAreas';
import GeneralInfo from '../screens/GeneralInfo';
import Menu from './DrawerMenu';

var defaultNavOptions = {
  headerStyle: { backgroundColor: Colors.pink },
  headerTintColor: '#FFF'
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const FoodStack = createStackNavigator({
  Food: FoodEntries,
  AddFood: FoodEntry,
});

const MedicineStack = createStackNavigator({
    Medicine: MedicineEntries,
    AddMedicine: MedicineEntry,
  });

const ActivityStack = createStackNavigator({
    Activities: ActivityEntries,
    AddActivity: ActivityEntry,
});

const SleepStack = createStackNavigator({
  Sleep: SleepEntry,
});

const PainScaleStack = createStackNavigator({
  PainScale
})

const PainAreasStack = createStackNavigator({
  PainAreas
})

const GeneralInfoStack = createStackNavigator({
  GeneralInfo
})

export default createDrawerNavigator({
  HomeStack,
  FoodStack,
  MedicineStack,
  ActivityStack,
  SleepStack,
  PainScaleStack,
  PainAreasStack,
  GeneralInfoStack
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
