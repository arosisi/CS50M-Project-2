import React from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

import SearchResultList from "../components/SearchResultList";

import { search } from "../mockData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  input: {
    height: 50,
    fontSize: 15,
    paddingHorizontal: 15
  },
  button: {
    marginBottom: 5
  }
});

export default class SearchScreen extends React.Component {
  state = {
    searchText: "",
    total: 0,
    page: 1,
    results: { 1: [] }
  };

  handleKeywordChange = searchText => this.setState({ searchText });

  handleSearch = () => {
    // TODO: Get search results with searchText
    this.setState({ total: 3049, page: 1, results: { 1: search.Search } });
  };

  handleSelectResult = result =>
    this.props.navigation.navigate("MovieInfo", result);

  render() {
    const { searchText, total, page, results } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Search by title...'
          value={searchText}
          onChangeText={this.handleKeywordChange}
        />

        <View style={styles.button}>
          <Button title='Search' onPress={this.handleSearch} />
        </View>

        <SearchResultList
          total={total}
          page={page}
          results={results}
          onSelectResult={this.handleSelectResult}
        />
      </View>
    );
  }
}
