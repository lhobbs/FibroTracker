import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';
import Slider from '@react-native-community/slider';
// import Picker from 'react-native-roll-picker'
import Colors from '../constants/Colors';
import moment from 'moment';
import { connect } from 'react-redux';

import { saveSleep, listSleep } from '../redux/reducer';

class SleepEntry extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          date: moment(),
          todaysEntry: {
            bedTime: '', 
            difficultyFallingAsleep: false, 
            difficultyStayingAsleep: false, 
            wakeUpTime: '', 
            wakeUpDifficulty: 0,
            sleepQuality: 0,
            energyLevel: 0,
          },
          
        };
    }
    

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
        title: params.title,
        headerRight: params.headerRight,
        headerLeft: params.headerLeft,
        headerStyle:  {backgroundColor: Colors.darkGray},
        headerTintColor: '#fff',
    };
  }; 

  componentDidMount() {
    this._setNavigationParams()
    this.props.listSleep().then(s => this.filterSleep())//.then(c => console.log(this.state.todaysEntry))
 }

 _setNavigationParams() {
    let title       = 'Sleep Entry';
    let headerRight = 
        <TouchableHighlight onPress={this._saveSleepEntry.bind(this)}>
            <Text style={{color:'#fff', padding: 10}}>Save</Text> 
        </TouchableHighlight>;
    let headerLeft = 
        <TouchableHighlight onPress={() => navigation.toggleDrawer()} style={{padding: 10}}>
            <Icon.Ionicons name='md-menu' color='#fff' size={30} />
        </TouchableHighlight>
  
    this.props.navigation.setParams({ 
      title,
      headerRight,
      headerLeft 
    });
  }

  async _saveSleepEntry() {
      const sleep = { 
        bedTime: this.state.bedTime, 
        wakeUpTime: this.state.wakeUpTime, 
        difficultyFallingAsleep: this.state.difficultyFallingAsleep, 
        difficultyStayingAsleep: this.state.difficultyStayingAsleep, 
        wakeUpDifficulty: this.state.wakeUpDifficulty,
        sleepQuality: this.state.sleepQuality
     }
    //  await addFoodEntry(food)
    //   this.props.navigation.navigate('Food')
    this.props.saveSleep(sleep);
    // this.props.navigation.navigate('Sleep')
  }

  updateDate(days) {
    this.setState({date: this.state.date.add(days, 'day')}) 
    //console.log('updateDate', this.state.date)
    this.filterSleep()
  }

  filterSleep() {
    var todaySleep = this.props.sleep.filter(f => f.dateTime >= this.state.date.startOf('day') && f.dateTime < this.state.date.endOf('day'))
    if (todaySleep.length > 0)
        this.setState({todaysEntry: todaySleep[0]})
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={[styles.row, {alignItems: 'stretch', borderBottomColor: Colors.lightPink2, borderBottomWidth: 1}]}>
          <TouchableHighlight onPress={() => this.updateDate(-1)} style={{flex:1}}>
            <Icon.FontAwesome name="arrow-left" style={{color: Colors.lightPink2}} size={26} />
          </TouchableHighlight>
          <Text style={{color: Colors.pink, flex: 1, fontSize: 18, alignSelf: 'center'}}>{this.state.date.format("ddd MMMM DD")}</Text>
          <TouchableHighlight onPress={() => this.updateDate(1)} style={{flex:1, alignItems: 'flex-end'}}>
            <Icon.FontAwesome name="arrow-right" style={{color: Colors.lightPink2}} size={26} />
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
            <TextInput
                style={styles.label}
                onChangeText={(bedTime) => this.setState(state => ({
                todaysEntry: {
                    ...state.todaysEntry,
                    bedTime
                }
            }))}
                value={this.state.todaysEntry.bedTime}
                placeholder="Bed Time"
            />
        </View>
        <View style={styles.row}>
            <TextInput
                style={styles.label}
                onChangeText={(wakeUpTime) => this.setState(state => ({
                todaysEntry: {
                    ...state.todaysEntry,
                    wakeUpTime
                }
            }))}
                value={this.state.todaysEntry.wakeUpTime}
                placeholder="Wake Up Time"
            />
        </View>
      <View style={styles.row}>
        <Text style={styles.label}>Difficulty Falling Asleep</Text>
        <Switch
            onValueChange={(difficultyFallingAsleep) => this.setState(state => ({
                todaysEntry: {
                    ...state.todaysEntry,
                    difficultyFallingAsleep
                }
            }))}
            value={this.state.todaysEntry.difficultyFallingAsleep}            
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Difficulty Staying Asleep</Text>
        <Switch
            onValueChange={(difficultyStayingAsleep) => this.setState(state => ({
                todaysEntry: {
                    ...state.todaysEntry,
                    difficultyStayingAsleep
                }
            }))}
            value={this.state.todaysEntry.difficultyStayingAsleep}            
        />
      </View>
      <View style={styles.row}>
        <TextInput
            style={styles.label}
            onChangeText={(wakeUpDifficulty) => this.setState(state => ({
                todaysEntry: {
                    ...state.todaysEntry,
                    wakeUpDifficulty
                }
            }))}
            value={this.state.todaysEntry.wakeUpDifficulty}
            placeholder="Wake Up Difficulty"
        />
      </View>
      <View style={styles.row}>
        <TextInput
            style={styles.label}
            onChangeText={(sleepQuality) => this.setState(state => ({
                todaysEntry: {
                    ...state.todaysEntry,
                    sleepQuality
                }
            }))}
            value={this.state.todaysEntry.sleepQuality}
            placeholder="Sleep Quality"
        />
      </View>
      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.black,
},
  row: {
      flexDirection: 'row',
      padding: 10
  },
  label: {
      fontSize: 20,
      color: Colors.lightGray
  },
  picker: {
      flex: 2,
      flexDirection: 'row'
  },
  switch: {
      tintColor: '#F5AFC2'
  },
  btn : {
      backgroundColor: '#CFCBCC',
      color: '#EE3B64'
  }
});

const mapStateToProps = state => {
    return {
      sleep: state.sleep
    };
  };
  
  const mapDispatchToProps = {
    saveSleep,
    listSleep
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SleepEntry);
