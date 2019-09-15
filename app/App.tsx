import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { Root } from "native-base";
import { StatusBar, YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Warning: componentWillReceiveProps"]);

function App() {
  return (
    <Root>
      <StatusBar barStyle="light-content" hidden />
      <AppNavigator />
    </Root>
  );
}

export default App;
