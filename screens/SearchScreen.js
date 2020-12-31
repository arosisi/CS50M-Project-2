import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import SearchResultList from "../components/SearchResultList";

import apiKeys from "../api-keys";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  error: {
    paddingTop: 10,
    paddingHorizontal: 15,
    color: "tomato"
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
    currentText: "" /* current text in the search bar */,
    searchText: "" /* text used in search */,
    total: 0,
    page: 1,
    results: { 1: [] },
    error: null
  };

  handleKeywordChange = currentText => this.setState({ currentText });

  handleSearch = async () => {
    const { currentText } = this.state;

    if (!currentText) {
      this.setState({
        searchText: currentText,
        total: 0,
        page: 1,
        results: { 1: [] },
        error: null
      });
      return;
    }

    try {
      const url = `http://www.omdbapi.com/?s=${currentText}&apikey=${apiKeys.OMDb}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.Response === "False") {
        this.handleSearchError(currentText, json.Error);
      } else {
        this.setState({
          searchText: currentText,
          total: parseInt(json.totalResults),
          page: 1,
          results: { 1: json.Search },
          error: null
        });
      }
    } catch (error) {
      this.handleSearchError(currentText, error.message);
    }
  };

  handlePrevSearch = () => this.setState({ page: this.state.page - 1 });

  handleNextSearch = async () => {
    const { searchText, page, results } = this.state;

    if (results[page + 1]) {
      this.setState({ page: page + 1 });
      return;
    }

    try {
      // prettier-ignore
      const url = `http://www.omdbapi.com/?s=${searchText}&page=${page + 1}&apikey=${apiKeys.OMDb}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.Response === "False") {
        this.handleSearchError(searchText, json.Error);
      } else {
        this.setState({
          total: parseInt(json.totalResults),
          page: page + 1,
          results: { ...results, [page + 1]: json.Search },
          error: null
        });
      }
    } catch (error) {
      this.handleSearchError(searchText, error.message);
    }
  };

  handleSearchError = (searchText, error) =>
    this.setState({
      searchText,
      total: 0,
      page: 1,
      results: { 1: [] },
      error
    });

  handleSelectResult = result =>
    this.props.navigation.navigate("MovieInfo", result);

  render() {
    const { currentText, total, page, results, error } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Search by title...'
          value={currentText}
          onChangeText={this.handleKeywordChange}
        />

        <View style={styles.button}>
          <Button title='Search' onPress={this.handleSearch} />
        </View>

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <SearchResultList
            total={total}
            page={page}
            results={results}
            onPrevButtonClick={this.handlePrevSearch}
            onNextButtonClick={this.handleNextSearch}
            onSelectResult={this.handleSelectResult}
          />
        )}
      </View>
    );
  }
}
