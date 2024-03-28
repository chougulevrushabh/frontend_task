import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useRef } from "react";
import Form from "./components/Form"
import Data from "./components/Data";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Form />}></Route>
          <Route exact path="/Data" element={<Data />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
