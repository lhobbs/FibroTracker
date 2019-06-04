import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';
import Slider from '@react-native-community/slider';
// import Picker from 'react-native-roll-picker'
import { addFoodEntry } from '../assets/scripts/service'
import Colors from '../constants/Colors';


class FoodEntry extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { food: '', caffeine: false, gluten: true, highSugar: false, chewiness: 2 };
    // }
    state = { food: '', caffeine: false, gluten: true, highSugar: false, chewiness: 2 };
    

  static navigationOptions = ({ navigation }) => {
    //   console.log('nav', navigation)
    const {params = {}} = navigation.state;
    // const {screenProps = {}} = navigation.getScreenProps()
    // console.log('screenprops', screenProps)
    return {
        title: params.title,
        headerRight: params.headerRight,
        headerStyle:  {backgroundColor: Colors.pink},
        headerTintColor: '#fff',
        // headerLeft: 
        //   <TouchableHighlight onPress={() => navigation.goBack()} style={{padding: 10}}>
        //     <Icon.Ionicons name='md-arrow-round-back' color='#fff' size={30} />
        //   </TouchableHighlight>
    };
  }; 

  componentDidMount() {
    this._setNavigationParams()
    // this.props.navigation.openDrawer();
    // this.props.navigation.setParams({
    //     handleThis: this.saveFoodEntry
    // });
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
     console.log('food', food)
      addFoodEntry(food)
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
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
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

export default FoodEntry 