import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Icon } from 'expo';
import { TouchableHighlight } from 'react-native'
import Colors from '../constants/Colors'


export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'app.json',
      headerStyle:  {backgroundColor: Colors.pink},
      headerTintColor: '#fff',
      headerLeft: 
        <TouchableHighlight onPress={() => navigation.navigate('Home')} style={{padding: 10}}>
          <Icon.Ionicons name='md-home' color='#fff' size={30} />
        </TouchableHighlight>
    }
    
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
