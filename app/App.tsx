import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { StyleProvider, Root } from "native-base";
import { StatusBar } from "react-native";

function App() {
  return (
    <Root>
      <StatusBar barStyle="light-content" hidden />
      <AppNavigator />
    </Root>
  );
}

export default App;
