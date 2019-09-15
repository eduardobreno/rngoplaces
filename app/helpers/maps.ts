export const goToCoordinate = (coordinate: any) => {
  return {
    center: coordinate,
    pitch: 2,
    heading: 0,
    altitude: 500,
    zoom: 17
  };
};
