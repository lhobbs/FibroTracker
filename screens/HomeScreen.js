import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Button
} from 'react-native';
import { WebBrowser, Icon } from 'expo';
import vIcon from 'react-native-vector-icons';
import ActionButton from 'react-native-action-button'
import { Container, Header, Content, Card, CardItem, Text } from 'native-base';

import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
// import Card from '../components/Card'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: <Text style={{color: '#FFF', fontSize: 24}}>Fibro Tracker</Text>,
      headerStyle:  {backgroundColor: Colors.pink},
      headerLeft: 
        (<TouchableHighlight onPress={() => navigation.toggleDrawer()} style={{padding: 10}}>
          <Icon.Ionicons name='md-menu' color='#fff' size={30} />
        </TouchableHighlight>)
    }
    
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.row}>
            <Card style={styles.card}>
              <CardItem header>
                <Text style={styles.subHeader}>Today's Pain Level</Text>
              </CardItem>
              <CardItem style={{ alignSelf: "center" }}>
                <Text style={styles.largeText}>4</Text>
              </CardItem>
              
            </Card>
            <Card style={styles.cardInverse}>
              <CardItem header style={{backgroundColor: Colors.pink}}>
                <Text style={styles.subHeader}>Hours Slept Last Night</Text>
              </CardItem>
              <CardItem style={{ alignSelf: "center", backgroundColor: Colors.pink }}>
                <Text style={[styles.largeText, {color: '#FFF'}]}>6</Text>
              </CardItem>
            </Card>
          </View>
        </ScrollView>
        {this.renderActionButton()}
      </View>
    );
  }

  renderActionButton() {
    return ( 
        <ActionButton buttonColor={Colors.teal}>
          <ActionButton.Item  
            buttonColor='#FFF' 
            onPress={() => {this.props.navigation.navigate("AddFood")}}>
            <vIcon.MaterialCommunityIcons
              name='food'
              size={26}
              style={{ marginBottom: -3 }}
              color={Colors.teal}
            />
            </ActionButton.Item>
           <ActionButton.Item 
              buttonColor='#FFF'
              onPress={() => {this.props.navigation.navigate("Links")}}>
              <vIcon.MaterialCommunityIcons
                  name='pill'
                  size={26}
                  style={{ marginBottom: -3 }}
                  color={Colors.teal}
              />
          </ActionButton.Item>
          <ActionButton.Item 
              buttonColor='#FFF'
              onPress={() => {this.props.navigation.navigate("LinksScreen")}}>
              <vIcon.MaterialCommunityIcons
                  name='run'
                  size={26}
                  style={{ marginBottom: -3 }}
                  color={Colors.teal}
              />
          </ActionButton.Item> 
          <ActionButton.Item 
              buttonColor='#FFF'
              onPress={() => {this.props.navigation.navigate("LinksScreen")}}>
              <vIcon.MaterialCommunityIcons
                  name='speedometer'
                  size={26}
                  style={{ marginBottom: -3 }}
                  color={Colors.teal}
              />
          </ActionButton.Item>
        </ActionButton>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  largeText: {
    fontSize: 50,
    color: Colors.pink,
    textAlign: 'center'
  },
  subHeader: {
    color: Colors.darkGray,
    textAlign: 'center',
    alignSelf: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  card: {
    // width: '100%'
    flex: 2,
  },
  cardInverse: {
    flex: 2,
    backgroundColor: Colors.pink,
  }
});
