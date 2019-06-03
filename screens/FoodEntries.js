import React from 'react';
import { FlatList, Text, ScrollView, StyleSheet } from 'react-native';

import { getFoodEntries } from '../assets/scripts/service'
import Colors from '../constants/Colors';


class FoodEntries extends React.Component {
    constructor(props) {
        super(props);
        this.state = { entries: [] };
    }
    

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
        title: params.title,
        headerRight: params.headerRight,
        headerStyle:  {backgroundColor: Colors.pink},
    };
  }; 

  componentDidMount() {
    this._setNavigationParams()
    this._loadFoodEntries()
 }

 _setNavigationParams() {
    let title       = 'Food Entries';
  
    this.props.navigation.setParams({ 
      title,
    });
  }

  _loadFoodEntries() {
      getFoodEntries().then(results => this.setState({entries: results}))
      //this.setState({entries: getFoodEntries()})
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
            data={this.state.entries}
            renderItem={({item, index}) => <Text style={styles.listItem}>{item.name}</Text>}
            keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // backgroundColor: Colors.lightPink,
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
  listItem: {
      fontSize: 20,
      color: Colors.darkGray,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#d6d7da',
  },
});

export default FoodEntries