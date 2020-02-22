import React from "react";
import {
  BrowserRouter as Router
  // Route,
  // Redirect,
  // Switch
} from "react-router-dom";
// CSS
import "./GoalList.css";

const GoalsList = props => {
  // console.log(props.userGoals);
  return (
    <div className="goals-list">
      <p>User's current goals</p>
      <ul>
        {props.userGoals.map(goal => {
          return (
            <li key={goal.id}>
              Goal: {goal.title} | Details: {goal.description} | Total Time: {goal.totalTime} | Status: {goal.completed ? "Completed" : "Not done"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GoalsList;
