import React from "react";
import { StyleSheet, View, ScrollView, Button, Text } from "react-native";
import PropTypes from "prop-types";

import SearchResult from "./SearchResult";

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 15
  }
});

export default class SearchResultList extends React.Component {
  shouldDisablePrevButton = () => this.props.page === 1;

  shouldDisableNextButton = () => this.props.page * 10 >= this.props.total;

  render() {
    const { total, page, results, onSelectResult } = this.props;
    return (
      <ScrollView>
        {results[page].map(result => (
          <SearchResult
            key={result.imdbID}
            result={result}
            onSelectResult={onSelectResult}
          />
        ))}

        {!!total && (
          <View style={styles.buttons}>
            <Button title='Prev' disabled={this.shouldDisablePrevButton()} />
            <Text>{page}</Text>
            <Button title='Next' disabled={this.shouldDisableNextButton()} />
          </View>
        )}
      </ScrollView>
    );
  }
}

SearchResultList.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  results: PropTypes.object.isRequired,
  onSelectResult: PropTypes.func.isRequired
};
