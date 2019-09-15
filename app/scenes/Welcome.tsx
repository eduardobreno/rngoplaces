import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button, Spinner } from "native-base";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

import I18n from "app/helpers/i18n";

import UserAPI from "app/services/api/userAPI";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Welcome = (props: Props) => {
  const { navigation } = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
      }}>
      <Text>Welcome</Text>
      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}>
        <Text>{I18n.t("welcome")}</Text>
      </Button>
    </View>
  );
};

export default Welcome;
