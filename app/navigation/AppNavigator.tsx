import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Welcome from "app/scenes/Welcome";
import Home from "app/scenes/Home";

const AppNavigator = createSwitchNavigator(
  { Welcome, Home },
  { initialRouteName: "Welcome" }
);

export default createAppContainer(AppNavigator);
