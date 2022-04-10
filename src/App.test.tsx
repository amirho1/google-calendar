import { Provider } from "react-redux";
import App from "./App";
import store from "./redux";
import { before } from "./utils/testHelper";

describe("App", () => {
  let element: HTMLElement;

  ({ element } = before(
    "App",
    <Provider store={store}>
      <App />
    </Provider>
  ));

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should set title after initialing page", () => {
    expect(document.title).toBe("تقویم فارسی گوگل");
  });
});
