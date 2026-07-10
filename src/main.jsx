import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />

    <ToastContainer
      position="top-right"
      autoClose={2500}
      theme="colored"
    />
  </BrowserRouter>
);