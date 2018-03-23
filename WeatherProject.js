/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";

import { /* Platform, */ AppRegistry, StyleSheet, Text, TextInput, View } from "react-native";
import Forecast from "./Forecast";
import OpenWeatherMap from "./open_weather_map";

AppRegistry.registerComponent("WeatherProject", () => WeatherProject);

/*
  const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
*/

type Props = {};

class WeatherProject extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { zip: "", forecast: null };
  }

  _handleTextChange = event => {
    const zip = event.nativeEvent.text;
    OpenWeatherMap.fetchForecast(zip)
      .then(forecast => {
        this.setState({ forecast: forecast });
      });
    console.log("Got a text change event.");
  }

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main = {this.state.forecast.main}
          description = {this.state.forecast.description}
          temp = {this.state.forecast.temp}
        />
      );
    }
    return (
      <View style = {styles.container}>
        <Text style = {styles.welcome}>
        You input {this.state.zip}.
        </Text>
        {content}
        <TextInput
          style = {styles.input}
          onSubmitEditing = {this._handleTextChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#666666"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    padding: 2,
    height: 40,
    width: 100,
    textAlign: "center"
  }
});

export default WeatherProject;
