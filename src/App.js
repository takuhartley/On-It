import React from "react";
import Homepage from "./Components/Homepage/Homepage";
import Nav from "./Components/Navigation/Nav";
import NewGoal from "./Components/NewGoal/NewGoal";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Homepage />
      <Nav />
      <NewGoal />
    </div>
  );
}

export default App;
