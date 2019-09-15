import React from "react";
import { mount, shallow } from "enzyme";

import { CardCarousel } from "./CardCarousel";
jest.mock("View", () => "view");

jest.mock("native-base", () => ({
  Toast: { show: jest.fn() },
  Card: "Card",
  CardItem: "CardItem"
}));

describe("CardCarousel", () => {
  let wrapper: any;

  beforeEach(() => {
    const item = { item: { photos: [{ photo_reference: "" }] } };
    wrapper = mount(CardCarousel(item, () => {}, () => {}));
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
