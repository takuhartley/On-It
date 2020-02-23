import React from "react";
import DeleteGoal from "../DeleteGoal/DeleteGoal";
import AddProgress from "../AddProgress/AddProgress";
import EditGoal from "../EditGoal/EditGoal";

const GoalDetail = props => {
  //console.log("User Goals:", props);
  return (
    <div>
      <hr />
      <p>Title: {props.title}</p>
      <p>Summary: {props.description}</p>
      <p>Total Hours: {props.totalTime}</p>
      <p>Completed: {props.completed ? "Completed" : "In progress"}</p>
      <EditGoal />
      <DeleteGoal />
      <AddProgress />
    </div>
  );
};

export default GoalDetail;
