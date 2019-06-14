import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight, Slider } from 'react-native';
import { Icon } from 'expo';
// import Slider from '@react-native-community/slider';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';

import { saveAppointment } from '../redux/reducer';


class AppointmentEntry extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          name: '',
          note: '',
          rating: 0
        };
    }
    

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
    let title       = 'New Appointment';
    let headerRight = 
        <TouchableHighlight onPress={this._saveAppointmentEntry.bind(this)}>
            <Text style={{color:'#fff', padding: 10}}>Save</Text> 
        </TouchableHighlight>;
  
    this.props.navigation.setParams({ 
      title,
      headerRight, 
    });
  }

  _saveAppointmentEntry() {
      
      const appointment = { 
        name: this.state.name, 
        note: this.state.note, 
        rating: this.state.rating
     }
    //  console.log(appointment)
     this.props.saveAppointment(appointment);//.then(r => console.log(r)).catch(e => console.log(e));
       this.props.navigation.navigate('Appointments')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
            <TextInput
            style={styles.label}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder="Appointment"
            />
        </View>
      <View style={styles.row}>
        <TextInput
        style={styles.label}
        onChangeText={(note) => this.setState({note})}
        value={this.state.note}
        placeholder="Notes"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Rating</Text>
        <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={3}
            step={1}
            value={this.state.todaysEntry.midday}
            minimumTrackTintColor={Colors.pink}
            maximumTrackTintColor={Colors.lightPink2}
            onSlidingComplete={(rating) => this.setState({rating})}
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
    backgroundColor: Colors.black
},
  row: {
      flexDirection: 'row',
      padding: 10
  },
  label: {
      fontSize: 20,
      color: '#FFF'
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
    //let storedFoodEntries =  state.food.push(food);
    return {
      activities: state.activities
    };
  };
  
  const mapDispatchToProps = {
    saveAppointment
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppointmentEntry);