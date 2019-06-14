import React from 'react';
import { FlatList, Text, ScrollView, StyleSheet, TouchableHighlight, View, SectionList } from 'react-native';
import { Icon } from 'expo';
import vIcon from 'react-native-vector-icons';
import { Right } from 'native-base';
import ActionButton from 'react-native-action-button'

import Colors from '../constants/Colors';

import { connect } from 'react-redux';
import moment from 'moment'

import { listAppointments } from '../redux/reducer';


class AppointmentEntries extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
          date: moment(),
          todaysEntries: []
        };
    }

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
        title: params.title,
        headerRight: params.headerRight,
        headerStyle:  {backgroundColor: Colors.darkGray},
        headerTintColor: '#fff',
        headerLeft: 
          <TouchableHighlight onPress={() => navigation.toggleDrawer()} style={{padding: 10}}>
            <Icon.Ionicons name='md-menu' color='#fff' size={30} />
          </TouchableHighlight>
    };
  }; 

  componentDidMount() {
    this._setNavigationParams()
    this.props.listAppointments().then(appointments => {
      this.filterAppointments()
    });
 }

 componentDidUpdate(prevProps) {
  // Requesting new data if route has changed.
  if (prevProps.appointments !== this.props.appointments) {
    this.filterAppointments();
  }
}

  updateDate(days) {
    this.setState({date: this.state.date.add(days, 'day')}) 
    this.filterAppointments()
  }

  filterAppointments() {
    var todayAppointments = this.props.appointments.filter(f => f.dateTime >= this.state.date.startOf('day') && f.dateTime < this.state.date.endOf('day'))
    this.setState({todaysEntries: todayAppointments})
  }

 _setNavigationParams() {
    let title       = 'Appointments';
  
    this.props.navigation.setParams({ 
      title,
    });
  }

  render() {
    // console.log('render', this.props.food)
    return (
      <View style={styles.container}>
        <View style={[styles.row, {alignItems: 'stretch'}]}>
          <TouchableHighlight onPress={() => this.updateDate(-1)} style={{flex:1}}>
            <Icon.FontAwesome name="arrow-left" style={{color: Colors.teal}} size={26} />
          </TouchableHighlight>
          <Text style={{color: Colors.teal, flex: 1, fontSize: 18, alignSelf: 'center'}}>{this.state.date.format("ddd MMMM DD")}</Text>
          <TouchableHighlight onPress={() => this.updateDate(1)} style={{flex:1, alignItems: 'flex-end'}}>
            <Icon.FontAwesome name="arrow-right" style={{color: Colors.teal}} size={26} />
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.container}>
          <FlatList
              data={this.state.todaysEntries}
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
        <Text style={styles.label}>{item.note}</Text>
        <Text style={styles.label}>{item.rating}</Text>
      </View>
    )
  }

  renderActionButton() {
    return ( 
        <ActionButton buttonColor={Colors.teal} onPress={() => this.props.navigation.navigate('AddAppointment') }></ActionButton>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: Colors.black,
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
    color: '#FFF'
   },
   time: {
    fontSize: 12,
    color: Colors.lightGray,
    alignSelf: 'flex-end',
    paddingRight: 10
}
});


const mapStateToProps = state => {
  return {
    appointments: state.appointments
  };
};

const mapDispatchToProps = {
  listAppointments
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentEntries);