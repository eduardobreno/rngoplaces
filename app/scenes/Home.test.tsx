import React from "react";
import { mount, shallow } from "enzyme";
//@ts-ignore
import MockAsyncStorage from "mock-async-storage";
import axios from "axios";

import Home, { MarkerList, getPosition, getPlacesNearby } from "./Home";
jest.mock("View", () => "view");
jest.mock("axios");
jest.mock("native-base", () => ({
  Toast: { show: jest.fn() }
}));

jest.mock("react-native-permissions", () => ({
  checkMultiple: jest.fn().mockResolvedValue({ location: "authorized" })
}));

jest.mock("react-native-localize", () => ({
  getLocales: jest.fn()
}));

jest.mock("@react-native-community/geolocation", () => ({
  getCurrentPosition: jest.fn((successPosition, errorPosition) => {
    successPosition(() => {});
    errorPosition({ error: { code: {} } });
  })
}));

jest.mock("react-native-maps", () => {
  const React = require.requireActual("react");

  class MockMarker extends React.Component {
    render() {
      return React.createElement("Marker", this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement("map-view", this.props, this.props.children);
    }
  }

  MockMapView.Marker = MockMarker;
  return MockMapView;
});

const mockImpl = new MockAsyncStorage();
jest.mock("@react-native-community/async-storage", () => mockImpl);

describe("Home", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(<Home />);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("getPosition works", async () => {
    const setCurrPosition = jest.fn();
    const setMarkers = jest.fn();

    await getPosition(setCurrPosition, setMarkers);

    expect(wrapper).toMatchSnapshot();
  });

  it("getPlacesNearby works", async () => {
    //@ts-ignore
    axios.get.mockResolvedValue({
      data: {
        results: [
          {
            geometry: {
              location: { lat: -23.6133058, lng: -46.64603220000001 }
            },
            id: "33ad02e48ec3c4bc49c50d3d8d7fe821de2b3fb7",
            name: "Comodita Homestay",
            vicinity: "Avenida Odila, 935, São Paulo"
          },
          {
            geometry: {
              location: { lat: -23.6075828, lng: -46.6424514 }
            },
            id: "54ca3a39b9662241fdf097de945c820bcf5afa41",
            name: "Metalcan Fotolitos Especiais Ltda.",
            vicinity: "Rua das Orquídeas, 259 - Mirandópolis, São Paulo"
          },
          {
            geometry: {
              location: { lat: -23.6114467, lng: -46.6370655 }
            },
            id: "0ed3cc9164deabed5fa710412224c2e6c4beaee3",
            name: "Magazine Luiza",
            vicinity: "Avenida Bosque da Saúde, 138 - Vila da Saúde, São Paulo"
          }
        ]
      }
    });

    const markers = await getPlacesNearby(0, 0);
    expect(markers).toHaveLength(3);
  });

  it("getPlacesNearby fails ", async () => {
    //@ts-ignore
    axios.get.mockRejectedValue();
    const markers = await getPlacesNearby(0, 0);
    expect(markers).toHaveLength(0);
  });

  it("renders Marker", () => {
    const setCurrPosition = jest.fn();
    const setMarkers = jest.fn();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders MarkersList", () => {
    const json = [
      {
        id: "33ad02e48ec3c4bc49c50d3d8d7fe821de2b3fb7",
        coordinate: { latitude: -23.6133058, longitude: -46.64603220000001 },
        title: "Comodita Homestay",
        description: "Avenida Odila, 935, São Paulo"
      },
      {
        id: "54ca3a39b9662241fdf097de945c820bcf5afa41",
        coordinate: { latitude: -23.6075828, longitude: -46.6424514 },
        title: "Metalcan Fotolitos Especiais Ltda.",
        description: "Rua das Orquídeas, 259 - Mirandópolis, São Paulo"
      },
      {
        id: "0ed3cc9164deabed5fa710412224c2e6c4beaee3",
        coordinate: { latitude: -23.6114467, longitude: -46.6370655 },
        title: "Magazine Luiza",
        description: "Avenida Bosque da Saúde, 138 - Vila da Saúde, São Paulo"
      }
    ];
    const markerList = shallow(<MarkerList markers={json} />);
    //     markerList.findWhere(
    //       n =>
    //         n.name() === "Marker" &&
    //         n.prop("key") === "0ed3cc9164deabed5fa710412224c2e6c4beaee3"
    //     )

    expect(markerList).toMatchSnapshot();
  });
});
