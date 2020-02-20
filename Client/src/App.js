import React, { useState } from "react";

// Imported Files
import Homepage from "./shared/pages/Homepage/Homepage";
import Nav from "./shared/components/navigation/Nav";
import CreateGoal from "./goal/components/CreateGoal/CreateGoal";
import GoalList from "./goal/components/GoalsList/GoalList";

// CSS
import "./App.css";

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
    // setGoals(userGoals.concat(newGoal));
    // Bullet proof
    setGoals(previousGoals => {
      return previousGoals.concat(newGoal);
    });
  };
  return (
    <div className="App">
      <Homepage />
      <Nav />
      <CreateGoal onAddGoal={addNewGoalHandler} />
      <GoalList userGoals={userGoals} />
    </div>
  );
}

export default App;
