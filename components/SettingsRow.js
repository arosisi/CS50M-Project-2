import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import PropTypes from "prop-types";

import SettingsContext from "../context/SettingsContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3
  }
});

class SettingsRow extends React.Component {
  toggleCheckBox = () => this.props.context.toggleInfo(this.props.info);

  render() {
    const { context, info } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.toggleCheckBox}>
        <CheckBox
          value={context.infos[info]}
          onValueChange={this.toggleCheckBox}
        />
        <Text>{info}</Text>
      </TouchableOpacity>
    );
  }
}

SettingsRow.propTypes = {
  info: PropTypes.string.isRequired
};

export default props => (
  <SettingsContext.Consumer>
    {context => <SettingsRow context={context} {...props} />}
  </SettingsContext.Consumer>
);
