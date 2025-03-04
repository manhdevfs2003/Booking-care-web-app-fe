import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import App from "./../src/containers/App";
import reduxStore, { persistor } from "./redux";
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <IntlProviderWrapper>
          <App />
        </IntlProviderWrapper>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
