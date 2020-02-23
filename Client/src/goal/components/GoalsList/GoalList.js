import React from "react";
import GoalDetails from "../GoalDetail/GoalDetail";
import "./GoalList.css";

const GoalsList = props => {
  // console.log(props.number);
  // console.log(props.userGoals);
  // const goal = (
  //   <div>
  //     {props.userGoals.map(goal => {
  //       return (
  //         <GoalDetails
  //           key={goal.id}
  //           title={goal.title}
  //           description={goal.description}
  //           totalTime={goal.totalTime}
  //           completed={goal.completed}
  //         />
  //       );
  //     })}
  //   </div>
  // );
  return (<ul>
  {props.userGoals.map(ug => (
    <li key={ug.id}>
      <span>Task: {ug.title} </span>
      <span>Summary: {ug.description} </span>
      <span>Duration: {ug.duration} </span>
      <span>Status: {ug.completed ? "Done" : "In Progress"} </span>
    </li>
  ))}
</ul>);
};
export default GoalsList;
