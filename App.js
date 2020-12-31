import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SettingsProvider from "./context/SettingsProvider";
import HomeTab from "./tabs/HomeTab";
import SettingsTab from "./tabs/SettingsTab";

const Tab = createBottomTabNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name='Home'
            component={HomeTab}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='home' color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name='Settings'
            component={SettingsTab}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='cog' color={color} size={size} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default () => (
  <SettingsProvider>
    <App />
  </SettingsProvider>
);
