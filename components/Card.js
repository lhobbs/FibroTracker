import React, { Component } from 'react';
import {
    StyleSheet,
    // Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

class Card2 extends Component {
    state = {
        hearted: true
    }
    // render() {
    //     return <View  style={styles.card2}>
    //                 <View style={styles.row}>
    //                     <Text style={styles.title}>Here is my test</Text>
    //                     <Icon name="md-heart" style={styles.iconFull} onPress={() => this.setState({hearted: false})} />
    //                 </View>
    //                 {/* <View style={styles.row}> */}
    //                     {/* <Text style={styles.verse}>Eph 1:3</Text> */}
    //                     <Text style={styles.name}>Some other text</Text>
    //                 {/* </View> */}
    //             </View>
    // }

    render() {
        return <Card>
                    <CardItem>
                    {/* <Body> */}
                        <Text color='black'>
                            Hello here is some text. I'm trying to make some cards. Will this text display?
                        </Text>
                    {/* </Body> */}
                    </CardItem>
                </Card>
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
  title: {
    color: '#3E3E3E',
    fontSize: 16,
    flexWrap: 'wrap',
    width: '80%'
  },
  name: {
      color: "#004d40",
      fontSize: 12,
      alignSelf: 'flex-end'
  },
  verse: {
    color: "#009688",
    fontSize: 12,
    // alignSelf: 'flex-start'
},
  newCard: {
    borderRightColor: "#e0f2f1",
    borderTopColor: "#e0f2f1",
    borderBottomColor: "#e0f2f1",
    borderLeftColor: "#009688", 
    borderWidth: 1, 
    borderLeftWidth: 2, 
    marginTop: 5,
    padding: 5,
    backgroundColor: "#fff",
    // flexDirection: 'row'
  },
  card: {
    flex: 1,
    margin: 5,
    // width: 170,
    height: 180,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    borderWidth : 1,
    borderColor : '#34495e'
  },
  iconFull: {
    fontSize: 20,
    height:30,
    color: '#e91e63'
  },
  card2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  }
});

export default Card2;