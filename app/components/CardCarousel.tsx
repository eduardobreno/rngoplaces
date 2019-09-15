import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { Card, CardItem } from "native-base";
import { goToCoordinate } from "app/helpers/maps";
import keyMaps from "app/resources/keyMaps";

export const CardCarousel = (
  { item, index }: any,
  carouselRef: any,
  mapViewRef: any
) => {
  const { photos } = item;
  let url = undefined;
  url =
    photos &&
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photos[0].photo_reference}&key=${keyMaps}`;
  return (
    <TouchableOpacity
      onPress={() => {
        if (carouselRef.current.currentIndex == index) {
          mapViewRef.current.animateCamera(goToCoordinate(item.coordinate), {
            duration: 500
          });
        }
      }}>
      <Card>
        <CardItem cardBody>
          {url && (
            <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />
          )}
          {!url && (
            <Image
              source={require("app/assets/images/no-image.png")}
              style={{ width: 200, height: 200 }}
            />
          )}
        </CardItem>
        <CardItem style={{ height: 50 }}>
          <Text>{item.title}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};
