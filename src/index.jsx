import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@app/App";
import store from "@store/store";
import "./utils/i18n";
import "./index.css";
import "@app/assets/css/theme.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastContainer } from "react-toastify";
import React from "react";

import "primeicons/primeicons.css";
import "rc-easyui/dist/themes/default/easyui.css";
import "rc-easyui/dist/themes/icon.css";
import "rc-easyui/dist/themes/react.css";

const { VITE_NODE_ENV, VITE_GA_ID } = import.meta.env;

if (VITE_NODE_ENV === "production" && VITE_GA_ID) {
  ReactGA.initialize(VITE_GA_ID);
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <PrimeReactProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />
        <App />
       
      </BrowserRouter>
    </Provider>
  </PrimeReactProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
