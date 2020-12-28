import React from "react";
import { render } from "@testing-library/react";
import CardList from "./CardList";

it("renders without crashing", function() {
  render(<CardList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<CardList cards={["card1", "card2"]} />);
  expect(asFragment()).toMatchSnapshot();
});