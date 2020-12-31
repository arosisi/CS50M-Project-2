import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../screens/SettingsScreen";

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
          name='Settings'
          component={SettingsScreen}
          options={{
            title: "Settings"
          }}
        />
      </Stack.Navigator>
    );
  }
}
