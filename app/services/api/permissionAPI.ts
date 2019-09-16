import { Alert, Platform } from "react-native";

import Permissions from "react-native-permissions";
import AndroidOpenSettings from "react-native-android-open-settings";

export async function askDefaultPermission() {
  const response = await Permissions.checkMultiple(["location"]);
  switch (response.location) {
    case "undetermined":
    case "denied":
      return alertForPermission(response.location, "location");
    case "restricted":
      Alert.alert("Não temos permissão", "Você precisa conceder manualmente!", [
        {
          text: "Não quero",
          onPress: () => Promise.resolve(false),
          style: "cancel"
        },
        {
          text: "Abrir configuração",
          onPress: AndroidOpenSettings.appDetailsSettings
        }
      ]);
      return Promise.reject();
    case "authorized":
      return Promise.resolve(true);
  }
}

async function requestPermission(permission: string) {
  const result = await Permissions.request(permission);
  if (result == "denied") {
    return alertForPermission(result, permission);
  } else {
    return Promise.resolve(true);
  }
}

async function alertForPermission(status: string, permission: string) {
  return new Promise((resolve, reject) => {
    Alert.alert(
      "Podemo saber onde você está?",
      "Precisamos saber sua localização para mostrar os lugares",
      [
        {
          text: "Não quero",
          onPress: () => reject("não quis"),
          style: "cancel"
        },
        status == "undetermined"
          ? {
              text: "OK",
              onPress: async () => {
                const result = await requestPermission(permission);
                console.log("aceitou", result);
                return Promise.resolve(result);
              }
            }
          : Platform.OS == "ios"
          ? {
              text: "Abrir configuração",
              onPress: Permissions.openSettings
            }
          : {
              text: "Ok",
              onPress: async () => {
                const result = await requestPermission(permission);
                return Promise.resolve(result);
              }
            }
      ]
    );
  });
}
