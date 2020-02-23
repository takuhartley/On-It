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
  // const [userGoals, setGoals] = useState([
  //   {
  //     id: 123,
  //     title: "Complete MERN project",
  //     description: "React Goal tracking project",
  //     totalTime: 50,
  //     completed: false,
  //     logs: [{ CompletedDescription: "2 Hours at Coffee Shop", time: 2 }]
  //   },
  //   {
  //     id: 234,
  //     title: "Complete VUE project",
  //     description: "Vue Peronsal project",
  //     totalTime: 25,
  //     completed: false,
  //     logs: [
  //       { Description: "1 hour at home", duration: 1 },
  //       { Description: "2 hours at home", duration: 2 }
  //     ]
  //   },
  //   {
  //     id: 445,
  //     title: "Complete MEAN project",
  //     description: "MEAN motivational project",
  //     totalTime: 5,
  //     completed: true,
  //     logs: [
  //       { Description: "3 hour at home", duration: 1 },
  //       { Description: "2 hours at home", duration: 2 }
  //     ]
  //   }
  // ]);
  const [enteredGoal, setEnteredGoal] = useState([]);
  const addGoalHandler = goal => {
    setEnteredGoal(prevGoals => [
      ...prevGoals,
      { id: Math.random().toString(), ...goal }
    ]);
  };

  return (
    <Router>
      <div className="App">
        <Homepage />
        <Nav />
        <CreateGoal onAddGoal={addGoalHandler}/>
        <GoalList userGoals={enteredGoal}/>
      </div>
    </Router>
  );
}

export default App;
