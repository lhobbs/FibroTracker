import PropTypes from 'prop-types';
import React, {Component} from 'react';
// import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors'

class Menu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.closeDrawer();
  }

  render () {
    return (
      <View style={styles.container}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Food')}>
            <Text style={styles.listItem}>
              Food
            </Text>
          </TouchableHighlight>
          
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')}>
            <Text style={styles.listItem}>
              Sleep
            </Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 25,
      backgroundColor: Colors.pink,
    },
    optionsTitleText: {
      fontSize: 16,
      marginLeft: 15,
      marginTop: 9,
      marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        padding: 10
    },
    listItem: {
        fontSize: 20,
        color: '#FFF',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#d6d7da',
    },
  });

Menu.propTypes = {
  navigation: PropTypes.object
};

export default Menu;