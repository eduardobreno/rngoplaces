import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Platform
} from "react-native";
import { Toast, Button } from "native-base";

import Carousel from "react-native-snap-carousel";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker, LatLng, AnimatedRegion } from "react-native-maps";
import axios from "axios";

import I18n from "app/helpers/i18n";
import { calculateBetween } from "app/helpers/distance";
import { goToCoordinate } from "app/helpers/maps";
import { askDefaultPermission } from "app/services/api/permissionAPI.ts";
import { CardCarousel } from "app/components/CardCarousel";
import keyMaps from "app/resources/keyMaps";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

interface IMaker {
  id: string;
  coordinate: LatLng | AnimatedRegion;
  title: string;
  description: string;
}
let isBack = false;
let isNotDragging = true;

export const getPlacesNearby = async (lat: number, lng: number) => {
  let markers = [];
  try {
    const result = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: "1000",
          key: keyMaps
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
        photos: item.photos,
        title: item.name,
        description: item.vicinity,
        distance: distance
      };
    });
  } catch (e) {
    Alert.alert(I18n.t("error"), I18n.t("failToFindPlacesNearby"));
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
      if (!isBack) {
        const result = await getPlacesNearby(coords.latitude, coords.longitude);
        result.sort((a: any, b: any) => a.distance - b.distance);
        setMarkers(result);
      }
    },
    error => {
      Alert.alert(I18n.t("error"), I18n.t("cantFindYourPosition"));
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

export const searchByRegion = async (coords: any, setMarkers: any) => {
  const result = await getPlacesNearby(coords.latitude, coords.longitude);
  result.sort((a: any, b: any) => a.distance - b.distance);
  setMarkers(result);
};

const Home = () => {
  const [currPosition, setCurrPosition] = useState();
  const [mapPosition, setMapPosition] = useState();
  const [searchInNewPlace, setSearchInNewPlace] = useState(false);
  const mapViewRef = useRef(null);
  const carouselRef = useRef(null);
  const [markers, setMarkers] = useState<Array<IMaker> | []>([]);

  useEffect(() => {
    askDefaultPermission()
      .then(e => {
        Toast.show({
          text: I18n.t("wait"),
          duration: 2000
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
        alignItems: "flex-end",
        paddingBottom: 15
      }}>
      {searchInNewPlace && (
        <>
          <Button
            full
            info
            style={style.btnFindMore}
            onPress={() => {
              setSearchInNewPlace(false);
              searchByRegion(mapPosition, setMarkers);
            }}>
            <Text>{I18n.t("findHere")}</Text>
          </Button>
          <Button
            full
            info
            style={style.btnResetPosition}
            onPress={() => {
              isBack = true;
              setSearchInNewPlace(true);
              getPosition(setMapPosition, setMarkers);
            }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("app/assets/images/reset-position.png")}
            />
          </Button>
        </>
      )}
      <MapView
        ref={e => {
          //@ts-ignore
          mapViewRef.current = e;
        }}
        initialRegion={currPosition}
        region={mapPosition}
        onPanDrag={e => {
          isNotDragging = false;
        }}
        onRegionChangeComplete={e => {
          if (!isNotDragging) {
            setSearchInNewPlace(true);
            setMarkers([]);
            setMapPosition(e);
            // setCurrPosition(e);
          }
        }}
        style={style.maps}>
        {currPosition && (
          <Marker
            key="user"
            coordinate={currPosition}
            image={require("app/assets/images/location.png")}
          />
        )}
        <MarkerList markers={markers} />
      </MapView>
      {!searchInNewPlace && (
        <Carousel
          ref={(e: any) => {
            //@ts-ignore
            carouselRef.current = e;
          }}
          layout="default"
          data={markers}
          renderItem={item => CardCarousel(item, carouselRef, mapViewRef)}
          sliderWidth={viewportWidth}
          itemWidth={200}
          itemHeight={200}
          loop={false}
          onSnapToItem={item => {
            isNotDragging = true;
            //@ts-ignore
            mapViewRef.current.animateCamera(
              goToCoordinate(markers[item].coordinate),
              { duration: 500 }
            );
          }}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  btnFindMore: {
    position: "absolute",
    left: "27%",
    top: "10%",
    paddingLeft: 10,
    paddingRight: 10
  },
  btnResetPosition: {
    position: "absolute",
    right: "5%",
    bottom: "10%",
    paddingLeft: 10,
    paddingRight: 10
  },
  maps: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  }
});

export default Home;
