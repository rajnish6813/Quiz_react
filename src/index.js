import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import history from "./store/history";
import "react-toastify/dist/ReactToastify.css";
import "./assets/vendor/css/bootstrap.css";
import "./assets/vendor/css/pages/authentication.css";
import "./assets/vendor/css/colors-material.css";
import "./assets/vendor/css/uikit.css";
import "./assets/vendor/fonts/fontawesome.css";
import "./assets/vendor/fonts/ionicons.css";
import "./assets/vendor/fonts/ionicons.css";
import "./assets/vendor/fonts/linearicons.css";
import "./assets/vendor/fonts/open-iconic.css";
import "./assets/vendor/fonts/pe-icon-7-stroke.css";
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "./assets/vendor/css/appwork.css";
import "./assets/vendor/css/theme-air-material.css";
import "bootstrap";
import "./assets/css/board.scss";

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
