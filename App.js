import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Pressable, Platform, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';

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
    newState.item.unshift({ text: newState.input, checked: false })
    newState.input = ''
    this.setState(newState)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerInner}>
          <Text style={{ fontSize: 30, color: "white", marginVertical: 20 }}>Tasks</Text>
          {
            this.state.item.map((item, index) => <Item item={item} key={index} onPress={() => this.onPress(index)} onDeletePress={() => this.onDeletePress(index)} />)
          }
        </View>
        <KeyboardAvoidingView
          style={styles.bottomContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput style={styles.input} placeholder='Type Here' value={this.state.input} onChangeText={(text) => this.handleTextChange(text)}></TextInput>
          <TouchableOpacity style={styles.addButton} onPress={() => this.handleInput()}>
            <Text style={styles.inputText}>Add</Text>
          </TouchableOpacity >
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
          <Text style={{ color: "#000", fontSize: 18, textDecorationLine: checked === "true" ? "line-through" : "none" }}>{text}</Text>
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
    paddingTop: StatusBar.currentHeight
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
    borderWidth: 1,
    borderColor: "#5981a6",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "75%"
  },
  inputText: {
    color: "white",
    paddingHorizontal: 7
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    width: "95%",
    marginVertical: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInner: {
    width: "80%",
    flexDirection: "row",
    alignItems: 'center'
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#5981a6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  delete: {
    color: "red",
    opacity: 0.8
  }
});
