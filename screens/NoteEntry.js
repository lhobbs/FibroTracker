import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Switch, View, Button, Alert, Picker, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';
import Slider from '@react-native-community/slider';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';

import { saveNote } from '../redux/reducer';


class NoteEntry extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          note: ''
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
    let title       = 'New Note';
    let headerRight = 
        <TouchableHighlight onPress={this._saveNoteEntry.bind(this)}>
            <Text style={{color:'#fff', padding: 10}}>Save</Text> 
        </TouchableHighlight>;
  
    this.props.navigation.setParams({ 
      title,
      headerRight, 
    });
  }

  _saveNoteEntry() {
      
      const note = { 
        note: this.state.note
     }
    //  console.log(note)
     this.props.saveNote(note);//.then(r => console.log(r)).catch(e => console.log(e));
       this.props.navigation.navigate('Notes')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
            <TextInput
            style={styles.label}
            onChangeText={(note) => this.setState({note})}
            value={this.state.note}
            multiline={true}
            placeholder="Note"
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
      notes: state.notes
    };
  };
  
  const mapDispatchToProps = {
    saveNote
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(NoteEntry);