import React from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";

import SettingsContext from "../contexts/SettingsContext";
import Rating from "../components/Rating";

import { MOVIE_INFOS } from "../constants";
import apiKeys from "../api-keys";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10
  },
  error: {
    paddingTop: 10,
    paddingHorizontal: 15,
    color: "tomato"
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: 5,
    marginVertical: 10
  },
  textMargin: {
    marginVertical: 10
  },
  textHighlight: {
    fontWeight: "bold"
  },
  ratings: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

class MovieInfoScreen extends React.Component {
  state = { movie: null, posterWidth: null, posterHeight: null, error: null };

  async componentDidMount() {
    try {
      const url = `http://www.omdbapi.com/?i=${this.props.route.params.imdbID}&apikey=${apiKeys.OMDb}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.Response === "False") {
        this.setState({ error: json.Error });
      } else {
        this.setState({ movie: json, error: null }, () =>
          Image.getSize(this.state.movie.Poster, (w, h) =>
            this.setState({ posterWidth: w, posterHeight: h })
          )
        );
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  renderPoster = () => {
    const { movie, posterWidth, posterHeight } = this.state;
    return (
      <Image
        style={{
          ...styles.image,
          aspectRatio: posterWidth / posterHeight
        }}
        source={{ uri: movie.Poster }}
      />
    );
  };

  renderNotFoundImage = () => {
    const notFoundImage = require("../assets/image-not-found.png");
    const { width, height } = Image.resolveAssetSource(notFoundImage);
    return (
      <Image
        style={{
          ...styles.image,
          aspectRatio: width / height
        }}
        source={notFoundImage}
      />
    );
  };

  render() {
    const { context } = this.props;
    const { movie, posterWidth, posterHeight, error } = this.state;
    const isReady = movie && posterWidth && posterHeight;
    return error ? (
      <Text style={styles.error}>{error}</Text>
    ) : (
      movie && (
        <ScrollView style={styles.container}>
          {isReady ? this.renderPoster() : this.renderNotFoundImage()}

          <Text style={styles.textMargin}>
            <Text style={styles.textHighlight}>{movie.Title}</Text>
            <Text> ({movie.Year})</Text>
          </Text>

          <Text style={styles.textMargin}>{movie.Plot}</Text>

          <Text>
            <Text style={styles.textHighlight}>Directors:</Text>
            <Text> {movie.Director}</Text>
          </Text>

          <Text>
            <Text style={styles.textHighlight}>Writers:</Text>
            <Text> {movie.Writer}</Text>
          </Text>

          <Text>
            <Text style={styles.textHighlight}>Actors:</Text>
            <Text> {movie.Actors}</Text>
          </Text>

          {Object.keys(context.infos)
            .filter(info => context.infos[info])
            .sort(
              (info1, info2) =>
                MOVIE_INFOS.indexOf(info1) - MOVIE_INFOS.indexOf(info2)
            )
            .map(info => (
              <Text key={info}>
                <Text style={styles.textHighlight}>{info}:</Text>
                <Text> {movie[info] || "N/A"}</Text>
              </Text>
            ))}

          <View style={{ ...styles.ratings, ...styles.textMargin }}>
            {movie.Ratings.map(rating => (
              <Rating
                key={rating.Source}
                source={rating.Source}
                value={rating.Value}
              />
            ))}
          </View>
        </ScrollView>
      )
    );
  }
}

export default props => (
  <SettingsContext.Consumer>
    {context => <MovieInfoScreen context={context} {...props} />}
  </SettingsContext.Consumer>
);
