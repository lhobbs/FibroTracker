import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';
import Slider from '@react-native-community/slider';
// import Picker from 'react-native-roll-picker'
import { addFoodEntry } from '../assets/scripts/service'
import Colors from '../constants/Colors';
import { connect } from 'react-redux';

import { saveFood } from '../redux/reducer';


class FoodEntry extends React.Component {
    state = { food: '', caffeine: false, gluten: true, highSugar: false, chewiness: 0 };
    

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
        title: params.title,
        headerRight: params.headerRight,
        headerStyle:  {backgroundColor: Colors.pink},
        headerTintColor: '#fff',
    };
  }; 

  componentDidMount() {
    this._setNavigationParams()
 }

 _setNavigationParams() {
    let title       = 'Food Entry';
    let headerRight = 
        <TouchableHighlight onPress={this._saveFoodEntry.bind(this)}>
            <Text style={{color:'#fff', padding: 10}}>Save</Text> 
        </TouchableHighlight>;
  
    this.props.navigation.setParams({ 
      title,
      headerRight, 
    });
  }

  _saveFoodEntry() {
      const food = { name: this.state.food, 
        caffeine: this.state.caffeine, 
        gluten: this.state.gluten, 
        highSugar: this.state.highSugar, 
        chewiness: this.state.chewiness
     }
     this.props.saveFood(food);//.then(r => console.log('success in food entry', JSON.stringify(r))).catch(err => console.log('err', err));
     //await addFoodEntry(food)
       this.props.navigation.navigate('Food')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
            <TextInput
            style={styles.label}
            onChangeText={(food) => this.setState({food})}
            value={this.state.food}
            placeholder="Food Item"
            />
        </View>
      <View style={styles.row}>
        <Text style={styles.label}>Caffeine?</Text>
        <Switch
            onValueChange={(caffeine) => this.setState({caffeine})}
            value={this.state.caffeine}            
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Gluten?</Text>
        <Switch
            onValueChange={(gluten) => this.setState({gluten})}
            value={this.state.gluten}
            trackColor={Colors.trackColor}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>High Sugar?</Text>
        <Switch
            onValueChange={(highSugar) => this.setState({highSugar})}
            value={this.state.highSugar}
            trackColor="#F5AFC2"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Chewiness</Text>
        {/* <Picker 
            data = {[{a: '0 - Not at all'}, {a: '1 - Some'}, {a: '2 - Very'}]}
            ref = '_Picker'
            name = 'a'
            onRowChange = {chewiness => { this.setState({chewiness})}}
            
        />  */}
        <Picker
            style={{width: 150, padding: 10}}
            selectedValue={this.state.chewiness}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({chewiness: itemValue})
            }>
            <Picker.Item label="0 - Not at all" value="0" />
            <Picker.Item label="1 - Some" value="1" />
            <Picker.Item label="2 - Very" value="2" />
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
    backgroundColor: '#fff'
  },
  row: {
      flexDirection: 'row',
      padding: 10
  },
  label: {
      fontSize: 20,
      color: Colors.darkGray
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
      foods: state.food
    };
  };
  
  const mapDispatchToProps = {
    saveFood
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FoodEntry);

// export default FoodEntry 