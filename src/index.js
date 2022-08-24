import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import PerfumeContext from "./context/ProductContext";
import Perfumes from "./api/db.json";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PerfumeContext.Provider value={Perfumes}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PerfumeContext.Provider>
);
