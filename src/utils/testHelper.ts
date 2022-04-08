import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

export interface Query {
  <K extends keyof HTMLElementTagNameMap>(selectors: K):
    | HTMLElementTagNameMap[K]
    | null;
  <K extends keyof SVGElementTagNameMap>(selectors: K):
    | SVGElementTagNameMap[K]
    | null;
  <E extends Element = Element>(selectors: string): E | null;
}

export function before(elTestId: string, testComponent: JSX.Element) {
  cleanup();
  render(testComponent);
  const element = screen.getByTestId(elTestId);
  const query = element.querySelector.bind(element);
  return { element, query };
}
