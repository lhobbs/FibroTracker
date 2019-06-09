import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';
import Slider from '@react-native-community/slider';
// import Picker from 'react-native-roll-picker'
import { addFoodEntry } from '../assets/scripts/service'
import Colors from '../constants/Colors';


class MedicineEntry extends React.Component {
    state = { 
        name: '',
        dosage: '', 
        category: 'A', 
        helped: false, 
        categories: [{id: 'A', description: 'Daily'}, {id: 'B', description: 'As Needed'}] 
    };
    

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
    let title       = 'Medicine Entry';
    let headerRight = 
        <TouchableHighlight onPress={this._saveFoodEntry.bind(this)}>
            <Text style={{color:'#fff', padding: 10}}>Save</Text> 
        </TouchableHighlight>;
  
    this.props.navigation.setParams({ 
      title,
      headerRight, 
    });
  }

  async _saveFoodEntry() {
      const food = { name: this.state.food, 
        caffeine: this.state.caffeine, 
        gluten: this.state.gluten, 
        highSugar: this.state.highSugar, 
        chewiness: this.state.chewiness
     }
     await addFoodEntry(food)
      this.props.navigation.navigate('Food')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
            <TextInput
                style={styles.label}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                placeholder="Medicine"
            />
        </View>
        <View style={styles.row}>
            <TextInput
                style={styles.label}
                onChangeText={(dosage) => this.setState({dosage})}
                value={this.state.dosage}
                placeholder="Dosage"
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Category</Text>
            <Picker
                style={{width: 150, padding: 10}}
                selectedValue={this.state.category}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({category: itemValue})
                } >
                {
                    this.state.categories.map((category) => {
                        return <Picker.Item label={category.description} value={category.id} key={category.id} />
                    })
                }
                {/* <Picker.Item label="Daily" value="1" /> */}
            </Picker>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Helped?</Text>
            <Switch
                onValueChange={(helped) => this.setState({helped})}
                value={this.state.helped}
                trackColor="#F5AFC2"
            />
        </View>
      </ScrollView>
    );
  }

//   componentWillReceiveProps(props) {
//       console.log('props')
//   }

  
  
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

export default MedicineEntry 