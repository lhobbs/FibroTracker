import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import Slider from '@react-native-community/slider';
import Picker from 'react-native-roll-picker'

export default class LinksScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { food: '', caffeine: false, gluten: false, highSugar: false, chewiness: 2 };
    }

  static navigationOptions = {
    title: 'Add Food',
  }; 

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(food) => this.setState({food})}
        value={this.state.food}
        placeholder="Food Item"
      />
      <Text>Caffeine?</Text>
      <Switch
        onValueChange={(caffeine) => this.setState({caffeine})}
        value={this.state.caffeine}
      />
      <Text>Gluten?</Text>
      <Switch
        onValueChange={(gluten) => this.setState({gluten})}
        value={this.state.gluten}
      />
      <Text>High Sugar?</Text>
      <Switch
        onValueChange={(highSugar) => this.setState({highSugar})}
        value={this.state.highSugar}
      />
      <Text>Chewiness</Text>
    <Picker 
        data = {[{a: '0 - Not at all'}, {a: '1 - Some'}, {a: '2 - Very'}]}
        ref = '_Picker'
        name = 'a'
        onRowChange = {chewiness => { this.setState({chewiness})}}
    /> 

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
});
