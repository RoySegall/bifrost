import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import YesNo from '../Components/YesNo';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Calling the yes no with true", () => {
  act(() => {
    render(YesNo(true), container);
  });
  expect(container.textContent).toBe("Yes");
});

it("Calling the yes no with true", () => {
  act(() => {
    render(YesNo(false), container);
  });
  expect(container.textContent).toBe("No");
});