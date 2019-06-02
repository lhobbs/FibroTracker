import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import Slider from '@react-native-community/slider';
import Picker from 'react-native-roll-picker'
import { addFoodEntry } from '../assets/scripts/service'

class FoodEntry extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { food: '', caffeine: false, gluten: true, highSugar: false, chewiness: 2 };
    // }
    state = { food: '', caffeine: false, gluten: true, highSugar: false, chewiness: 2 };
    

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    // const {screenProps = {}} = navigation.getScreenProps()
    // console.log('screenprops', screenProps)
    return {
        title: params.title,
        headerRight: params.headerRight

    };

    // headerRight: 
    //     <Button
    //         onPress={() => {
    //         addFoodEntry({ name: params.food, 
    //                         caffeine: screenProps.caffeine, 
    //                         gluten: screenProps.gluten, 
    //                         highSugar: screenProps.highSugar, 
    //                         chewiness: screenProps.chewiness})
    //         }}
    //         title="Save"
    //     />
  }; 

  componentDidMount() {
    this._setNavigationParams()
    // this.props.navigation.setParams({
    //     handleThis: this.saveFoodEntry
    // });
 }

 _setNavigationParams() {
    let title       = 'Food Entry';
    let headerRight = <Button onPress={this._saveFoodEntry.bind(this)} title="Save" />;
  
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
            style={{height: 40 }}
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
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>High Sugar?</Text>
        <Switch
            onValueChange={(highSugar) => this.setState({highSugar})}
            value={this.state.highSugar}
        />
      </View>
      <View style={styles.picker}>
        <Text style={styles.label}>Chewiness</Text>
        <Picker 
            data = {[{a: '0 - Not at all'}, {a: '1 - Some'}, {a: '2 - Very'}]}
            ref = '_Picker'
            name = 'a'
            onRowChange = {chewiness => { this.setState({chewiness})}}
            
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
    backgroundColor: '#fff',
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
      fontSize: 20
  },
  picker: {
      flex: 2,
      flexDirection: 'row'
  }
});

export default FoodEntry