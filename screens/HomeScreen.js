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
  Button, Dimensions
} from 'react-native';
import { WebBrowser, Icon } from 'expo';
import vIcon from 'react-native-vector-icons';
import ActionButton from 'react-native-action-button'
import { Container, Header, Content, Card, CardItem, Text } from 'native-base';
import { LineChart } from 'react-native-chart-kit';
// import { LineChart } from 'react-native-charts-wrapper';
import moment from 'moment';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
// import Card from '../components/Card'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      painWeekData : {
        labels: [], // ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data: [ 2, 2, 1, 2, 0, 1, 2 ],
          color: (opacity = 1) => Colors.pink,//`rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ]
      },
      chartConfig : {
        backgroundColor: Colors.black,
        backgroundGradientFrom: Colors.black,
        backgroundGradientTo: Colors.black,
        color: (opacity = 1) => '#fff', //`rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        decimalPlaces: 1,
        style: {
          padding: 0,
          margin: 0,
          backgroundColor: Colors.black
        }
      },
      screenWidth: Dimensions.get('window').width - 50
    }; 
}
  

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: <Text style={{color: '#FFF', fontSize: 24}}>Fibro Tracker</Text>,
      headerStyle:  {backgroundColor: Colors.darkGray},
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
            <Card style={styles.cardInverse}>
              <CardItem header style={{backgroundColor: Colors.pink}}>
                <Text style={styles.subHeader}>Today's Pain Level</Text>
              </CardItem>
              <CardItem style={{ alignSelf: "center", backgroundColor: Colors.pink }}>
                <Text style={[styles.largeText, {color: '#FFF'}]}>4</Text>
              </CardItem>
            </Card>

            <Card style={styles.card}>
              <CardItem header style={{backgroundColor: Colors.darkGray}}>
                <Text style={styles.subHeader2}>Hours Slept Last Night</Text>
              </CardItem>
              <CardItem style={{ alignSelf: "center", backgroundColor: Colors.darkGray }}>
                <Text style={styles.largeText}>6</Text>
              </CardItem>
            </Card>
          </View>

          <View style={[styles.row, {backgroundColor: Colors.black}]}>
            <Card style={[styles.card, {padding: 0}]}>
              <CardItem header style={{backgroundColor: Colors.black}}>
                <Text style={styles.subHeader2}>Current Week Pain</Text>
              </CardItem>
              <CardItem style={{padding: 0, margin: 0, backgroundColor: Colors.black}}>
                <LineChart
                  data={this.state.painWeekData}
                  width={this.state.screenWidth}
                  height={this.state.screenWidth}
                  fromZero={true}
                  withInnerLines={false}
                  withDots={true}
                  chartConfig={this.state.chartConfig}
                />
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
            buttonColor={Colors.darkGray} 
            onPress={() => {this.props.navigation.navigate("AddFood")}}>
            <vIcon.MaterialCommunityIcons
              name='food'
              size={26}
              style={{ marginBottom: -3 }}
              color={Colors.teal}
            />
            </ActionButton.Item>
           <ActionButton.Item 
              buttonColor={Colors.darkGray}
              onPress={() => {this.props.navigation.navigate("AddMedicine")}}>
              <vIcon.MaterialCommunityIcons
                  name='pill'
                  size={26}
                  style={{ marginBottom: -3 }}
                  color={Colors.lightTeal}
              />
          </ActionButton.Item>
          <ActionButton.Item 
              buttonColor={Colors.darkGray}
              onPress={() => {this.props.navigation.navigate("AddActivity")}}>
              <vIcon.MaterialCommunityIcons
                  name='run'
                  size={26}
                  style={{ marginBottom: -3 }}
                  color={Colors.lightTeal}
              />
          </ActionButton.Item> 
          <ActionButton.Item 
              buttonColor={Colors.darkGray}
              onPress={() => {this.props.navigation.navigate("AddAppointment")}}>
              <vIcon.MaterialCommunityIcons
                  name='stethoscope'
                  size={26}
                  style={{ marginBottom: -3 }}
                  color={Colors.lightTeal}
              />
          </ActionButton.Item>
          <ActionButton.Item 
              buttonColor={Colors.darkGray}
              onPress={() => {this.props.navigation.navigate("AddNote")}}>
              <vIcon.SimpleLineIcons
                  name='note'
                  size={26}
                  style={{ marginBottom: -3 }}
                  color={Colors.lightTeal}
              />
          </ActionButton.Item>
        </ActionButton>
    );
  }

  componentWillMount() {
    for(let i = -6; i < 1; i++) {
      var date = moment().add(i, 'day')
      this.state.painWeekData.labels.push(date.format('dd'))
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  contentContainer: {
    paddingTop: 30,
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
  subHeader2: {
    color: '#FFF',
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
    backgroundColor: Colors.darkGray,
    borderColor: Colors.black
  },
  cardInverse: {
    flex: 2,
    backgroundColor: Colors.pink,
    borderColor: Colors.black
  }
});
