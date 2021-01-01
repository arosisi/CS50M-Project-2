import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";

import SettingsRow from "../components/SettingsRow";
import SettingsAllRow from "../components/SettingsAllRow";

import { MOVIE_INFOS } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15
  },
  text: {
    marginTop: 15,
    marginBottom: 5
  }
});

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>
          Select the additional movie information to display
        </Text>
        <SettingsAllRow />
        {MOVIE_INFOS.map(info => (
          <SettingsRow key={info} info={info} />
        ))}
      </ScrollView>
    );
  }
}
