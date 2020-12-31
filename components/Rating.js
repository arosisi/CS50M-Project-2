import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import PropTypes from "prop-types";

import { RATING_SOURCES } from "../constants";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8
  },
  image: {
    height: 18
  }
});

export default class Rating extends React.Component {
  state = { logo: null };

  componentDidMount() {
    let logo = null;
    switch (this.props.source) {
      case RATING_SOURCES.IMDB:
        logo = require("../assets/imdb.png");
        break;
      case RATING_SOURCES.ROTTEN_TOMATOES:
        logo = require("../assets/rotten-tomatoes.png");
        break;
      case RATING_SOURCES.METACRITIC:
        logo = require("../assets/metacritic.png");
    }
    const { width, height } = Image.resolveAssetSource(logo);
    this.setState({ logo, logoWidth: width, logoHeight: height });
  }

  render() {
    const { logo, logoWidth, logoHeight } = this.state;
    return (
      logo && (
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.value}</Text>
          <Image
            style={{ ...styles.image, aspectRatio: logoWidth / logoHeight }}
            source={logo}
          />
        </View>
      )
    );
  }
}

Rating.propTypes = {
  source: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
