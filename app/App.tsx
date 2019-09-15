import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { StyleProvider, Root } from "native-base";

function App() {
  return (
    <Root>
      <AppNavigator />
    </Root>
  );
}

export default App;
