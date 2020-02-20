import React from "react";

// CSS
import "./GoalList.css";

const GoalsList = props => {
  // console.log(props.userGoals);
  return (
    <div className="goals-list">
      <p>User's current goals</p>
      <ul>
        {props.userGoals.map(goal => {
          return <li key={goal.id}>{goal.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default GoalsList;
