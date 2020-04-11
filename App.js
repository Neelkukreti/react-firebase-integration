import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import * as firebase from 'firebase'
import {db}  from './constants/config'
import Firebase from "firebase";


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      presentToDo: 'ji',
    };
  }

  componentDidMount() {

    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
  };
  this.setState({ready:false, error: null });
 // navigator.geolocation.getCurrentPosition( this.geoSuccess, 
  //                                        this.geoFailure,
  //                                        geoOptions);
  navigator.geolocation.watchPosition(this.geoSuccess,this.geoFailure,geoOptions);

    
    db.ref('/todos').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let todoItems = {...data};
      this.setState({
        todos: todoItems,
      });
    });
  }
  geoSuccess = (position) => {
 //   console.log(position.coords.latitude);
    
    this.setState({
        ready:true,
        where: {lat: position.coords.latitude,lng:position.coords.longitude }
    })
    this.addNewTodo(position.coords.latitude,position.coords.longitude,this.state.id);
}
geoFailure = (err) => {
    this.setState({error: err.message});
}
  addNewTodo(lt,lg,id) {
    
    db.ref('/todos' + id).set({
      
      lat:lt,
      long:lg
    }); 
    this.clearTodos();

  }
  clearTodos() {
    let latM,latO;
    let longM, longO;
    db.ref('/todos'+10+'/lat').on('value', querySnapShot => {
      latM = querySnapShot.val() ? querySnapShot.val() : {};
    });
    db.ref('/todos'+10+'/long').on('value', querySnapShot => {
      longM= querySnapShot.val() ? querySnapShot.val() : {};
    });
    db.ref('/todos'+11+'/lat').on('value', querySnapShot => {
      latO = querySnapShot.val() ? querySnapShot.val() : {};
    });
    db.ref('/todos'+11+'/long').on('value', querySnapShot => {
      longO= querySnapShot.val() ? querySnapShot.val() : {};
    });
   // db.ref('/todos').remove();
  }


  render() {
    return (
      <View paddingVertical="90" >
        <Text>{this.state.presentToDo}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: '50%',
    textAlign: 'center',
  },
});