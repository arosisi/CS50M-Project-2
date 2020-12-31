import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import SettingsContext from "../context/SettingsContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    backgroundColor: "ghostwhite",
    borderColor: "gainsboro",
    borderWidth: 1,
    borderRadius: 2
  },
  text: {
    fontWeight: "bold"
  }
});

class SettingsAllRow extends React.Component {
  toggleCheckBox = () =>
    this.props.context.toggleAllInfos(!this.areSomeSelected());

  areSomeSelected = () => {
    const { context } = this.props;
    return Object.keys(context.infos).some(info => context.infos[info]);
  };

  render() {
    const checked = this.areSomeSelected();
    return (
      <TouchableOpacity style={styles.container} onPress={this.toggleCheckBox}>
        <CheckBox value={checked} onValueChange={this.toggleCheckBox} />
        <Text style={styles.text}>
          {`${checked ? "Deselect" : "Select"} all`}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default props => (
  <SettingsContext.Consumer>
    {context => <SettingsAllRow context={context} {...props} />}
  </SettingsContext.Consumer>
);
