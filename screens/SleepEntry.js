import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';
import Slider from '@react-native-community/slider';
// import Picker from 'react-native-roll-picker'
import Colors from '../constants/Colors';
import { connect } from 'react-redux';

import { saveSleep } from '../redux/reducer';

class SleepEntry extends React.Component {
    state = { 
        bedTime: '', 
        difficultyFallingAsleep: false, 
        difficultyStayingAsleep: false, 
        wakeUpTime: '', 
        wakeUpDifficulty: 0,
        sleepQuality: 0,
        energyLevel: 0
     };
    

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
        title: params.title,
        headerRight: params.headerRight,
        headerStyle:  {backgroundColor: Colors.darkGray},
        headerTintColor: '#fff',
    };
  }; 

  componentDidMount() {
    this._setNavigationParams()
 }

 _setNavigationParams() {
    let title       = 'Sleep Entry';
    let headerRight = 
        <TouchableHighlight onPress={this._saveSleepEntry.bind(this)}>
            <Text style={{color:'#fff', padding: 10}}>Save</Text> 
        </TouchableHighlight>;
  
    this.props.navigation.setParams({ 
      title,
      headerRight, 
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
            <TextInput
                style={styles.label}
                onChangeText={(bedTime) => this.setState({bedTime})}
                value={this.state.bedTime}
                placeholder="Bed Time"
            />
        </View>
        <View style={styles.row}>
            <TextInput
                style={styles.label}
                onChangeText={(wakeUpTime) => this.setState({wakeUpTime})}
                value={this.state.wakeUpTime}
                placeholder="Wake Up Time"
            />
        </View>
      <View style={styles.row}>
        <Text style={styles.label}>Difficulty Falling Asleep</Text>
        <Switch
            onValueChange={(difficultyFallingAsleep) => this.setState({difficultyFallingAsleep})}
            value={this.state.difficultyFallingAsleep}            
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Difficulty Staying Asleep</Text>
        <Switch
            onValueChange={(difficultyStayingAsleep) => this.setState({difficultyStayingAsleep})}
            value={this.state.difficultyStayingAsleep}            
        />
      </View>
      <View style={styles.row}>
        <TextInput
            style={styles.label}
            onChangeText={(wakeUpDifficulty) => this.setState({wakeUpDifficulty})}
            value={this.state.wakeUpDifficulty}
            placeholder="Wake Up Difficulty"
        />
      </View>
      <View style={styles.row}>
        <TextInput
            style={styles.label}
            onChangeText={(sleepQuality) => this.setState({sleepQuality})}
            value={this.state.sleepQuality}
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
    saveSleep
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SleepEntry);
