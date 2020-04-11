import React,{useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
} from 'react-native';
import CheckBox from 'react-native-check-box';

const onCheck = () => {
    setDone(!doneState);
};
const ToDoItem = () => {
const [doneState, setDone] = useState(false);
  return (
    <View  style = {styles.todoItem}>
      <CheckBox
        checkBoxColor="skyblue"
      />
      <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
        A random To-Do item
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
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
      minWidth: "50%",
      textAlign: "center"
    },
  });
export default ToDoItem;