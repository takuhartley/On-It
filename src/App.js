import React, { useState } from "react";
import Homepage from "./Components/Homepage/Homepage";
import Nav from "./Components/Navigation/Nav";
import NewGoal from "./Components/NewGoal/NewGoal";
import "./App.css";
import GoalsList from "./Components/GoalsList/GoalsList";
function App() {
  const [userGoals, setGoals] = useState([
    {
      id: 123,
      title: "Complete MERN project",
      description: "React Goal tracking project",
      hours: 2
    },
    {
      id: 234,
      title: "Complete VUE project",
      description: "React Goal tracking project",
      hours: 2
    },
    {
      id: 345,
      title: "Complete MEAN project",
      description: "React Goal tracking project",
      hours: 2
    }
  ]);

  const addNewGoalHandler = newGoal => {
    setGoals(userGoals.concat(newGoal));
  };
  return (
    <div className="App">
      <Homepage />
      <Nav />
      <NewGoal onAddGoal = {addNewGoalHandler} />
      <GoalsList userGoals={userGoals} />
    </div>
  );
}

export default App;
