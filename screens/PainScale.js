import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight, Slider } from 'react-native';
import { Icon } from 'expo';
// import Slider from '@react-native-community/slider';
// import Picker from 'react-native-roll-picker'
import Colors from '../constants/Colors';
import moment from 'moment';
import { connect } from 'react-redux';

import { savePain, listPain } from '../redux/reducer';

class PainScale extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          date: moment(),
          todaysEntry: {
            morning: 0, 
            midday: 0,
            endday: 0,
            night: 0,
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
    this.props.listPain().then(s => this.filterPain())//.then(c => console.log(this.state.todaysEntry))
 }

 _setNavigationParams() {
    let title       = 'Pain Scale';
    let headerRight = 
        <TouchableHighlight onPress={this._savePainScale.bind(this)}>
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

  async _savePainScale() {
      const pain = { 
        morning: this.state.todaysEntry.morning, 
        midday: this.state.todaysEntry.midday, 
        endday: this.state.todaysEntry.endday, 
        night: this.state.todaysEntry.night
     }
    this.props.savePain(pain);
  }

  updateDate(days) {
    this.setState({date: this.state.date.add(days, 'day')}) 
    this.filterPain()
  }

  filterPain() {
    var todayPain = this.props.pain.filter(f => f.dateTime >= this.state.date.startOf('day') && f.dateTime < this.state.date.endOf('day'))
    if (todayPain.length > 0)
        this.setState({todaysEntry: todayPain[0]})
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
            <Text style={styles.label}>Morning</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.morning}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onSlidingComplete={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        morning: pain
                    }
                }))}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Mid-day</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.midday}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onSlidingComplete={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        midday: pain
                    }
                }))}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>End of day</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.endday}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onSlidingComplete={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        endday: pain
                    }
                }))}
            />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Night</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.night}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onSlidingComplete={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        night: pain
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
      pain: state.pain
    };
  };
  
  const mapDispatchToProps = {
    savePain,
    listPain
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PainScale);
