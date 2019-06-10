import React from 'react';
import { FlatList, Text, ScrollView, StyleSheet, TouchableHighlight, View, SectionList } from 'react-native';
import { Icon } from 'expo';
import vIcon from 'react-native-vector-icons';
import { Right } from 'native-base';
import ActionButton from 'react-native-action-button'

import { getFoodEntries } from '../assets/scripts/service'
import Colors from '../constants/Colors';

import { connect } from 'react-redux';

import { listFood } from '../redux/reducer';


class FoodEntries extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { entries: [] };
    // }

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
        title: params.title,
        headerRight: params.headerRight,
        headerStyle:  {backgroundColor: Colors.pink},
        headerTintColor: '#fff',
        headerLeft: 
          <TouchableHighlight onPress={() => navigation.navigate('Home')} style={{padding: 10}}>
            <Icon.Ionicons name='md-home' color='#fff' size={30} />
          </TouchableHighlight>
    };
  }; 

  // componentWillMount() {
  //   this._loadFoodEntries();
  //   console.log('loaded food entries')
  // }

  componentDidMount() {
    this._setNavigationParams()
    this.props.listFood('relferreira');
 }


 _setNavigationParams() {
    let title       = 'Food Entries';
  
    this.props.navigation.setParams({ 
      title,
    });
  }

  _loadFoodEntries() {
      getFoodEntries().then(results => this.setState({entries: results}))
  }

  render() {
    // console.log('render', this.props.food)
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <FlatList
              data={this.props.food}
              renderItem={({item, index}) => this.renderListItem(item) }
              keyExtractor={(item, index) => index.toString()}
          /> 
        </ScrollView>
        {this.renderActionButton()}
      </View>
    );
  }

  renderListItem(item) {
    return (
      <View style={styles.listItem}> 
        <Text style={styles.label}>{item.name}</Text>
          <Right>
            <View style={{flexDirection: 'row'}}>
            {item.caffeine ? <Icon.Ionicons name="md-cafe" style={{color: Colors.lightPink}} size={26} /> : null}
            {item.gluten ? <vIcon.MaterialCommunityIcons name='corn' size={26} color={Colors.lightPink} /> : null}
            {item.highSugar ? <vIcon.MaterialCommunityIcons name='candycane' size={26} color={Colors.lightPink} /> : null}
            {item.chewiness > 0 ? <vIcon.MaterialCommunityIcons name={item.chewiness == 1 ? 'tooth-outline': 'tooth'} size={26} color={Colors.lightPink} /> : null}
            </View>
          </Right>
      </View>
    )
  }

  renderActionButton() {
    return ( 
        <ActionButton buttonColor={Colors.teal} onPress={() => this.props.navigation.navigate('AddFood') }></ActionButton>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
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
      flexDirection: 'row'
  },
  label: {
    fontSize: 20,
    color: Colors.darkGray
}
});


const mapStateToProps = state => {
  // let storedFoodEntries =  Object.keys(state.food).map(k => ({ key: k, ...state.food[k] }));
  // console.log(storedFoodEntries)
  return {
    food: state.food
  };
};

const mapDispatchToProps = {
  listFood
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodEntries);
//export default FoodEntries