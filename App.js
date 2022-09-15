import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Platform, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      input: "",
      item: [
        { text: "Task 1", checked: "true" },
        { text: "Task 2", checked: "false" },
        { text: "Task 3", checked: "true" }
      ]
    }
  }

  onDeletePress(deleteIndex) {
    let newState = this.state;
    newState.item = newState.item.filter((item, index) => index !== deleteIndex)
    this.setState(newState)
  }

  onPress(index) {
    let newState = this.state;
    newState.item[index].checked = newState.item[index].checked === "true" ? "false" : "true"
    this.setState(newState)
  }

  handleTextChange(text) {
    this.setState((prev) => ({ ...prev, input: text }))
  }

  handleInput() {
    let newState = this.state;
    newState.item.unshift(newState.input)
    console.log(newState)
    this.setState(newState)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerInner}>
          <Text style={{ fontSize: 24, color: "white", marginVertical: 8 }}>Tasks</Text>
          {
            this.state.item.map((item, index) => <Item item={item} key={index} onPress={() => this.onPress(index)} onDeletePress={() => this.onDeletePress(index)} />)
          }
        </View>
        <KeyboardAvoidingView
          style={styles.bottomContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput style={styles.input} placeholder='Type Here' value={this.state.input} onChangeText={(text) => this.handleTextChange(text)}></TextInput>
          <Pressable style={styles.addButton} onPress={() => this.handleInput}> <Text style={styles.inputText}>Add</Text> </Pressable >
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

class Item extends Component {
  render({ text, checked } = this.props.item) {
    return (
      <View style={styles.item}>
        <View style={styles.itemInner}>
          <Pressable style={checked === "true" ? { ...styles.checkbox, backgroundColor: "white" } : styles.checkbox} onPress={this.props.onPress}>
            {checked === "true" ? <Text style={{ color: "#5981a6" }}>✔</Text> : null}
          </Pressable>
          <Text style={{ color: "#000", textDecorationLine: checked === "true" ? "line-through" : "none" }}>{text}</Text>
        </View>
        <TouchableOpacity onPress={this.props.onDeletePress}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5981a6',
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50
  },
  containerInner: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    width: "95%",
    marginVertical: 20,
    padding: 10,
    borderRadius: 7
  },
  addButton: {
    borderRadius: 20,
    backgroundColor: "#5981a6",
    color: "white",
    padding: 7
  },
  input: {
    border: "1px solid #5981a6",
    borderRadius: 20,
    paddingHorizontal: 7,
    width: "75%"
  },
  inputText: {
    color: "white",
    paddingHorizontal: 7
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 7,
    paddingVertical: 10,
    borderRadius: 5,
    width: "95%",
    marginVertical: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInner: {
    width: "80%",
    flexDirection: "row",
    gap: 5,
    alignItems: 'center'
  },
  checkbox: {
    width: 20,
    height: 20,
    border: "2px solid #5981a6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  delete: {
    color: "red",
    opacity: 0.8
  }
});
