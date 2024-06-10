import "./App.css";
import React from "react";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ReactDOM from 'react-dom/client';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              {/* <Route exact path="/business" element={<News setProgress={ setProgress} key = "business" pageSize={ pageSize} country="in" category="business" />} /> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
