import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight, Slider } from 'react-native';
import { Icon } from 'expo';
// import Slider from '@react-native-community/slider';
import Colors from '../constants/Colors';
import moment from 'moment';
import { connect } from 'react-redux';

import { savePainAreas, listPainAreas } from '../redux/reducer';

class PainAreas extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          date: moment(),
          todaysEntry: {
            head: 0, 
            headDescription: '',
            jaw: 0,
            neck: 0,
            shoulders: 0,
            back: 0,
            extremities: 0,
            extremitiesDescription: '',
            touchyPain: 0
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
    this.props.listPainAreas().then(s => this.filterPain())//.then(c => console.log(this.state.todaysEntry))
 }

 _setNavigationParams() {
    let title       = 'Pain Areas';
    let headerRight = 
        <TouchableHighlight onPress={this._savePainAreas.bind(this)}>
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

  async _savePainAreas() {
      const pain = { 
        head: this.state.todaysEntry.head, 
        headDescription: this.state.todaysEntry.headDescription,
        jaw: this.state.todaysEntry.jaw,
        neck: this.state.todaysEntry.neck,
        shoulders: this.state.todaysEntry.shoulders,
        back: this.state.todaysEntry.back,
        extremities: this.state.todaysEntry.extremities,
        extremitiesDescription: this.state.todaysEntry.extremitiesDescription,
        touchyPain: this.state.todaysEntry.touchyPain
     }
    this.props.savePainAreas(pain);
  }

  updateDate(days) {
    this.setState({date: this.state.date.add(days, 'day')}) 
    //console.log('updateDate', this.state.date)
    this.filterPain()
  }

  filterPain() {
    var todayPain = this.props.painAreas.filter(f => f.dateTime >= this.state.date.startOf('day') && f.dateTime < this.state.date.endOf('day'))
    // there should be one entry per day, but prevent error if array is empty
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
            <Text style={styles.label}>Head</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.head}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        head: pain
                    }
                }))}
            />
        </View>
        <View style={styles.row}>
            <TextInput
                style={styles.label}
                onChangeText={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        headDescription: pain
                    }
                }))}
                value={this.state.todaysEntry.headDescription}
                placeholder="Headache type"
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Jaw</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.jaw}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        jaw: pain
                    }
                }))}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Neck</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.neck}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        neck: pain
                    }
                }))}
            />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Shoulders</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.shoulders}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        shoulders: pain
                    }
                }))}
            />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Back</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.back}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        back: pain
                    }
                }))}
            />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Touchy Pain</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.touchyPain}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        touchyPain: pain
                    }
                }))}
            />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Extremities</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={this.state.todaysEntry.extremities}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor={Colors.lightPink2}
                onValueChange={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        extremities: pain
                    }
                }))}
            />
      </View>
        <View style={styles.row}>
            <TextInput
                style={styles.label}
                onChangeText={(pain) => this.setState(state => ({
                    todaysEntry: {
                        ...state.todaysEntry,
                        extremitiesDescription: pain
                    }
                }))}
                value={this.state.todaysEntry.extremitiesDescription}
                placeholder="Extremities description"
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
      painAreas: state.painAreas
    };
  };
  
  const mapDispatchToProps = {
    savePainAreas,
    listPainAreas
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PainAreas);
