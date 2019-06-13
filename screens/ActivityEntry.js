import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';
import Slider from '@react-native-community/slider';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';

import { saveActivity } from '../redux/reducer';


class ActivityEntry extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          name: '',
          activityLevel: 1,
          activityLevels: [{id: 1, description: 'Easy'}, {id: 2, description: 'Medium'}, {id: 3, description: 'Hard'}],
          effect: 1,
          effects: [{id: 1, description: 'Worse'}, {id: 2, description: 'Same'}, {id: 3, description: 'Better'}]
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
    let title       = 'New Activity';
    let headerRight = 
        <TouchableHighlight onPress={this._saveActivityEntry.bind(this)}>
            <Text style={{color:'#fff', padding: 10}}>Save</Text> 
        </TouchableHighlight>;
  
    this.props.navigation.setParams({ 
      title,
      headerRight, 
    });
  }

  _saveActivityEntry() {
      
      const activity = { 
        name: this.state.name, 
        activityLevel: this.state.activityLevel, 
        effect: this.state.effect
     }
    //  console.log(activity)
     this.props.saveActivity(activity);//.then(r => console.log(r)).catch(e => console.log(e));
       this.props.navigation.navigate('Activities')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
            <TextInput
            style={styles.label}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder="Activity"
            />
        </View>
      <View style={styles.row}>
        <Text style={styles.label}>Activity Level</Text>
        <Picker
            style={{width: 150, padding: 10, color: '#FFF'}}
            selectedValue={this.state.activityLevel}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({activityLevel: itemValue})
            } >
            {
                this.state.activityLevels.map((level) => {
                    return <Picker.Item label={level.description} value={level.id} key={level.id} />
                })
            }
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Effect</Text>
        <Picker
            style={{width: 150, padding: 10, color: '#FFF'}}
            selectedValue={this.state.effect}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({effect: itemValue})
            } >
            {
                this.state.effects.map((effect) => {
                    return <Picker.Item label={effect.description} value={effect.id} key={effect.id} />
                })
            }
        </Picker>
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
    saveActivity
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ActivityEntry);