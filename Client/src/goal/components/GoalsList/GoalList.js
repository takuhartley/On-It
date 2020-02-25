import React from "react";
import GoalDetails from "../GoalDetail/GoalDetail";
import "./GoalList.css";

const GoalsList = props => {
  const goal = (
    <div>
      {props.userGoals.map(ug => {
        return (
          <GoalDetails
            key={ug.id}
            title={ug.title}
            description={ug.description}
            totalTime={ug.duration}
            status={ug.status}
          />
        );
      })}
    </div>
  );

  return <div>{goal}</div>;
};
export default GoalsList;

// <ul>
//   {props.userGoals.map(ug => (
//     <li key={ug.id}>
//       <span>Task: {ug.title} </span>
//       <span>Summary: {ug.description} </span>
//       <span>Duration: {ug.duration} </span>
//       <span>Status: {ug.completed ? "Done" : "In Progress"} </span>
//     </li>
//   ))}
// </ul>
