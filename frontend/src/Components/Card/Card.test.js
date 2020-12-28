import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import { MemoryRouter } from "react-router";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <Card />
    </MemoryRouter>
  );
});

it("matches snapshot for company", function() {
  let item = {
    handle: "rithm",
    name: "Rithm School",
    description: "Become an exceptional developer in 16 weeks.",
    logo_url:
      "https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
  };
  const { asFragment } = render(
    <MemoryRouter>
      <Card item={item} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot for job", function() {
  let item = { title: "CEO", salary: 1000000, equity: 10 };
  const { asFragment } = render(
    <MemoryRouter>
      <Card item={item} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});