import Menu from './DrawerMenu';
import { createDrawerNavigator } from 'react-navigation';
import FoodEntry from '../screens/FoodEntry';
import FoodEntries from '../screens/FoodEntries';
import LinksScreen from '../screens/LinksScreen';

export default createDrawerNavigator({
  
  FoodEntries: {
      screen: FoodEntries
  },
  FoodEntry: {
    screen: FoodEntry
  },
  Home: {
      screen: LinksScreen
  }
}, {
  contentComponent: Menu,
  drawerWidth: 300
});