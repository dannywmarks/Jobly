import React from "react";
import { render } from "@testing-library/react";
import Login from "../Login/Login";
import { MemoryRouter } from "react-router";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
