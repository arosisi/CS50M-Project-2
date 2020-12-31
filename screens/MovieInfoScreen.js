import React from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";

import SettingsContext from "../context/SettingsContext";
import Rating from "../components/Rating";

import { MOVIE_INFOS } from "../constants";
import { movie } from "../mockData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10
  },
  image: {
    width: "100%",
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
  state = { movie: null, posterWidth: null, posterHeight: null };

  componentDidMount() {
    // TODO: Get info with this.props.route.params.imdbID
    this.setState({ movie }, () =>
      Image.getSize(this.state.movie.Poster, (w, h) =>
        this.setState({ posterWidth: w, posterHeight: h })
      )
    );
  }

  render() {
    const { context } = this.props;
    const { movie, posterWidth, posterHeight } = this.state;
    return (
      movie &&
      posterWidth &&
      posterHeight && (
        <ScrollView style={styles.container}>
          <Image
            style={{ ...styles.image, aspectRatio: posterWidth / posterHeight }}
            source={{ uri: movie.Poster }}
          />

          <Text style={styles.textMargin}>
            <Text style={styles.textHighlight}>{movie.Title}</Text>
            <Text>{` (${movie.Year})`}</Text>
          </Text>

          <Text style={styles.textMargin}>{movie.Plot}</Text>

          <Text>
            <Text style={styles.textHighlight}>Directors:</Text>
            <Text>{` ${movie.Director}`}</Text>
          </Text>

          <Text>
            <Text style={styles.textHighlight}>Writers:</Text>
            <Text>{` ${movie.Writer}`}</Text>
          </Text>

          <Text>
            <Text style={styles.textHighlight}>Actors:</Text>
            <Text>{` ${movie.Actors}`}</Text>
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
                <Text>{` ${movie[info]}`}</Text>
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
