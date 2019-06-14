import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight, Slider } from 'react-native';
import { Icon } from 'expo';
// import Slider from '@react-native-community/slider';
import Colors from '../constants/Colors';
import moment from 'moment';
import { connect } from 'react-redux';

import { saveGeneralInfo, listGeneralInfo } from '../redux/reducer';

class GeneralInfo extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          date: moment(),
          todaysEntry: {
            mood: 0, 
            social: 0,
            active: 0,
            energy: 0
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
    this.props.listGeneralInfo().then(s => this.filterGeneral())//.then(c => console.log(this.state.todaysEntry))
 }

 _setNavigationParams() {
    let title       = 'Day Overview';
    let headerRight = 
        <TouchableHighlight onPress={this._saveGeneralInfo.bind(this)}>
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

  async _saveGeneralInfo() {
      const info = { 
        mood: this.state.todaysEntry.mood, 
        social: this.state.todaysEntry.social,
        active: this.state.todaysEntry.active,
        energy: this.state.todaysEntry.energy
     }
    this.props.saveGeneralInfo(info);
  }

  updateDate(days) {
    this.setState({date: this.state.date.add(days, 'day')}) 
    //console.log('updateDate', this.state.date)
    this.filterGeneral()
  }

  filterGeneral() {
    var todayInfo = this.props.generalInfo.filter(f => f.dateTime >= this.state.date.startOf('day') && f.dateTime < this.state.date.endOf('day'))
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
            <Text style={styles.label}>Mood</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.mood}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(mood) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        mood: mood
                    }
                }))}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Social</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.social}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(social) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        social: social
                    }
                }))}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Active</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.active}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(active) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        active: active
                    }
                }))}
            />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Energy</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.energy}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(energy) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        energy: energy
                    }
                }))}
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
      generalInfo: state.generalInfo
    };
  };
  
  const mapDispatchToProps = {
    saveGeneralInfo,
    listGeneralInfo
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);
