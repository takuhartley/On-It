import React from "react";
import "./GoalsList.css";

const GoalsList = props => {
  console.log(props.userGoals);
  return (
    <div className="goals-list">
      <p>Your current goals</p>
      <ul>
        {props.userGoals.map(goal => {
          return <li key={goal.id}>{goal.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default GoalsList;
