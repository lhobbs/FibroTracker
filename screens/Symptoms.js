import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight, Slider } from 'react-native';
import { Icon } from 'expo';
// import Slider from '@react-native-community/slider';
import Colors from '../constants/Colors';
import moment from 'moment';
import { connect } from 'react-redux';

import { saveSymptoms, listSymptoms } from '../redux/reducer';

class Symptoms extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          date: moment(),
          todaysEntry: {
            light: false, 
            sound: false,
            movement: false,
            touch: false,
            dizzy: false,
            nauseous: false,
            earsRinging: false,
            foggy: false
          }
        };
    }
    

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
        title: params.title,
        headerRight: params.headerRight,
        headerLeft: 
        <TouchableHighlight onPress={() => navigation.toggleDrawer()} style={{padding: 10}}>
          <Icon.Ionicons name='md-menu' color='#fff' size={30} />
        </TouchableHighlight>,
        headerStyle:  {backgroundColor: Colors.darkGray},
        headerTintColor: '#fff',
    };
  }; 

  componentDidMount() {
    this._setNavigationParams()
    this.props.listSymptoms().then(s => this.filterSymptoms())//.then(c => console.log(this.state.todaysEntry))
 }

 _setNavigationParams() {
    let title       = 'Symptoms';
    let headerRight = 
        <TouchableHighlight onPress={this._saveSymptoms.bind(this)}>
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

  async _saveSymptoms() {
      const sympt = { 
        light: this.state.todaysEntry.light, 
        sound: this.state.todaysEntry.sound,
        movement: this.state.todaysEntry.movement,
        touch: this.state.todaysEntry.touch,
        dizzy: this.state.todaysEntry.dizzy,
        nauseous: this.state.todaysEntry.nauseous,
        earsRinging: this.state.todaysEntry.earsRinging,
        foggy: this.state.todaysEntry.foggy
     }
    this.props.saveSymptoms(sympt);
  }

  updateDate(days) {
    this.setState({date: this.state.date.add(days, 'day')}) 
    //console.log('updateDate', this.state.date)
    this.filterSymptoms()
  }

  filterSymptoms() {
    var todayInfo = this.props.symptoms.filter(f => f.dateTime >= this.state.date.startOf('day') && f.dateTime < this.state.date.endOf('day'))
    // there should be one entry per day, but prevent error if array is empty
    if (todayInfo.length > 0)
        this.setState({todaysEntry: todayInfo[0]})
    else
        this.setState({todaysEntry: {}})
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
            <Text style={styles.label}>Sensitivity to Light</Text>
            <Switch
                onValueChange={(light) => this.setState(state => ({
                        todaysEntry: {
                            ...state.todaysEntry,
                            light: light
                        }
                    }))}
                value={this.state.todaysEntry.light}            
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Sensitivity to Sound</Text>
            <Switch
                onValueChange={(sound) => this.setState(state => ({
                        todaysEntry: {
                            ...state.todaysEntry,
                            sound: sound
                        }
                    }))}
                value={this.state.todaysEntry.sound}            
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Sensitivity to Touch</Text>
            <Switch
                onValueChange={(touch) => this.setState(state => ({
                        todaysEntry: {
                            ...state.todaysEntry,
                            touch: touch
                        }
                    }))}
                value={this.state.todaysEntry.touch}            
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Sensitivity to Movement</Text>
            <Switch
                onValueChange={(movement) => this.setState(state => ({
                        todaysEntry: {
                            ...state.todaysEntry,
                            movement: movement
                        }
                    }))}
                value={this.state.todaysEntry.movement}            
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Dizzy/Light Headed</Text>
            <Switch
                onValueChange={(dizzy) => this.setState(state => ({
                        todaysEntry: {
                            ...state.todaysEntry,
                            dizzy: dizzy
                        }
                    }))}
                value={this.state.todaysEntry.dizzy}            
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Nauseous</Text>
            <Switch
                onValueChange={(nauseous) => this.setState(state => ({
                        todaysEntry: {
                            ...state.todaysEntry,
                            nauseous: nauseous
                        }
                    }))}
                value={this.state.todaysEntry.nauseous}            
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Ears Ringing</Text>
            <Switch
                onValueChange={(earsRinging) => this.setState(state => ({
                        todaysEntry: {
                            ...state.todaysEntry,
                            earsRinging: earsRinging
                        }
                    }))}
                value={this.state.todaysEntry.earsRinging}            
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Foggy</Text>
            <Switch
                onValueChange={(foggy) => this.setState(state => ({
                        todaysEntry: {
                            ...state.todaysEntry,
                            foggy: foggy
                        }
                    }))}
                value={this.state.todaysEntry.foggy}            
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
      symptoms: state.symptoms
    };
  };
  
  const mapDispatchToProps = {
    saveSymptoms,
    listSymptoms
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Symptoms);
