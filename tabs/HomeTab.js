import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
import MovieInfoScreen from "../screens/MovieInfoScreen";

const Stack = createStackNavigator();

export default class HomeTab extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white"
          }
        }}
      >
        <Stack.Screen
          name='Search'
          component={SearchScreen}
          options={{
            title: "Search"
          }}
        />
        <Stack.Screen
          name='MovieInfo'
          component={MovieInfoScreen}
          options={({ route }) => ({
            title: route.params.Title
          })}
        />
      </Stack.Navigator>
    );
  }
}
