import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Image } from 'react-native';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      item: [
        { text: "Task 1", checked: "true" },
        { text: "Task 2", checked: "false" },
        { text: "Task 3", checked: "true" }
      ]
    }
  }

  onPress(index) {
    console.log('Hello')
    this.setState()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {
          this.state.item.map((item, index) => <Item item={item} key={index} onPress={(index) => this.onPress(index)} />)
        }
      </SafeAreaView>
    );
  }
}

class Item extends Component {
  render({ text, checked } = this.props.item) {
    return (
      <View style={styles.item}>
        <Pressable style={checked === "true" ? { ...styles.checkbox, backgroundColor: "white" } : styles.checkbox} onPress={this.props.onPress}>
          {/* <Image source={{ uri: "./check-mark.png" }} /> */}
        </Pressable>
        <Text style={{ color: "white", textDecorationLine: checked === "true" ? "line-through" : "none" }}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  item: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "grey",
    padding: 7,
    borderRadius: 5,
    width: "95%",
    marginVertical: 2
  },
  checkbox: {
    width: 20,
    height: 20,
    border: "2px solid white",
    borderRadius: 5,
    color: "white"
  }
});
