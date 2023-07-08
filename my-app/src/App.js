import logo from "./logo.svg";
import "./App.css";
import { restroData } from "./Database/restroData";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Restaurant } from "./Pages/Restaurant";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/restaurants/:restaurantId"
          element={<Restaurant />}
        />
      </Routes>
    </div>
  );
}

export default App;