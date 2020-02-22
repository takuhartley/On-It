import React, { useState } from "react";
import {
  BrowserRouter as Router
  // Route,
  // Redirect,
  // Switch
} from "react-router-dom";
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
      totalTime: 50,
      completed: false,
      log: [
        { CompletedDescription: "2 Hours at Coffee Shop", time: 2 }
      ]
    },
    {
      id: 234,
      title: "Complete VUE project",
      description: "Vue Peronsal project",
      totalTime: 25,
      completed: false,
      log: [
        { Description: "1 hour at home", duration: 1 },
        { Description: "2 hours at home", duration: 2 }
      ]
    },
    {
      id: 445,
      title: "Complete MEAN project",
      description: "MEAN motivational project",
      totalTime: 5,
      completed: true,
      log: [
        { Description: "3 hour at home", duration: 1 },
        { Description: "2 hours at home", duration: 2 }
      ]
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
    <Router>
      <div className="App">
        <Homepage />
        <Nav />
        <CreateGoal onAddGoal={addNewGoalHandler} />
        <GoalList userGoals={userGoals} />
      </div>
    </Router>
  );
}

export default App;
