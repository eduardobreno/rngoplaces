import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Toast } from "native-base";

import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker, LatLng, AnimatedRegion } from "react-native-maps";
import axios from "axios";
import { calculateBetween } from "app/helpers/distance";
import { askDefaultPermission } from "app/services/api/permissionAPI.ts";

interface IMaker {
  id: string;
  coordinate: LatLng | AnimatedRegion;
  title: string;
  description: string;
}

export const getPlacesNearby = async (lat: number, lng: number) => {
  let markers = [];
  try {
    const result = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: "1000",
          key: "AIzaSyC5jV5-dbllskGs0N11oEfHG5hHr8jKEFg"
        }
      }
    );
    const places = result.data.results;
    markers = places.map((item: any) => {
      const distance = calculateBetween(
        lat,
        lng,
        item.geometry.location.lat,
        item.geometry.location.lng
      );
      return {
        id: item.id,
        coordinate: {
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng
        },
        title: item.name,
        description: item.vicinity,
        distance: distance
      };
    });
  } catch (e) {
    Alert.alert("Erro", "Falha ao localizar lugares próximos");
  }
  return markers;
};

export const getPosition = async (setCurrPosition: any, setMarkers: any) =>
  Geolocation.getCurrentPosition(
    async position => {
      const { coords } = position;
      setCurrPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      });

      const result = await getPlacesNearby(coords.latitude, coords.longitude);
      setMarkers(result);
    },
    error => {
      Alert.alert("Erro", "Não conseguimos descobrir usa posição!");
      // console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
  );

export const MarkerList = ({ markers }: any) =>
  markers.map((marker: IMaker) => (
    <Marker
      key={marker.id}
      coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}
    />
  ));

const Home = () => {
  const [currPosition, setCurrPosition] = useState();
  const [markers, setMarkers] = useState<Array<IMaker> | []>([]);

  useEffect(() => {
    askDefaultPermission()
      .then(e => {
        Toast.show({
          text: "Aguarde..."
        });
        getPosition(setCurrPosition, setMarkers);
      })
      .catch(e => {
        // console.log(e);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "pink",
        alignItems: "center"
      }}>
      <MapView
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        region={currPosition}>
        {currPosition && (
          <Marker
            key="user"
            coordinate={currPosition}
            image={require("app/assets/images/location.png")}
          />
        )}
        <MarkerList markers={markers} />
      </MapView>
    </View>
  );
};

export default Home;
