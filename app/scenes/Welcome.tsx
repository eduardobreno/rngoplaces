import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Text, Button, Spinner } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

import I18n from "app/helpers/i18n";
import { askDefaultPermission } from "app/services/api/permissionAPI";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Welcome = ({ navigation }: IProps) => {
  useEffect(() => {
    askDefaultPermission();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ImageBackground
        source={require("app/assets/images/continent-earth-geography-52502.jpg")}
        style={style.bgImage}
      />
      <View style={style.container}>
        <Text style={style.title}>{I18n.t("welcomeToRnGoPlaces")}</Text>
        <Text style={style.description}>
          {I18n.t("hereYouFinedPlacesNearbyYou")}
        </Text>
        <Button
          full
          onPress={() => {
            navigation.navigate("Home");
          }}>
          <Text>{I18n.t("explore")}</Text>
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
    opacity: 0.5
  },
  container: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    color: "#ffffff",
    fontSize: 34,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10
  },
  description: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  }
});

export default Welcome;
