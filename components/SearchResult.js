import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10
  },
  image: {
    width: 100,
    borderRadius: 5,
    marginRight: 10
  },
  texts: {
    flex: 1
  },
  title: {
    flexWrap: "wrap",
    fontWeight: "bold"
  }
});

export default class SearchResult extends React.Component {
  state = { posterWidth: null, posterHeight: null };

  componentDidMount() {
    Image.getSize(this.props.result.Poster, (w, h) =>
      this.setState({ posterWidth: w, posterHeight: h })
    );
  }

  render() {
    const { result, onSelectResult } = this.props;
    const { posterWidth, posterHeight } = this.state;
    return (
      posterWidth &&
      posterHeight && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => onSelectResult(result)}
        >
          <Image
            style={{ ...styles.image, aspectRatio: posterWidth / posterHeight }}
            source={{ uri: result.Poster }}
          />
          <View style={styles.texts}>
            <Text style={styles.title}>{`${result.Title}`}</Text>
            <Text>{`Year: ${result.Year}`}</Text>
            <Text>{`IMDB ID: ${result.imdbID}`}</Text>
          </View>
        </TouchableOpacity>
      )
    );
  }
}

SearchResult.propTypes = {
  result: PropTypes.object.isRequired,
  onSelectResult: PropTypes.func.isRequired
};
