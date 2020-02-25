import React from "react";
// import DeleteGoal from "../DeleteGoal/DeleteGoal";
import AddProgress from "../AddProgress/AddProgress";
import EditGoal from "../EditGoal/EditGoal";
import DeleteGoal from "../DeleteGoal/DeleteGoal";

const GoalDetail = (props, id) => {
  return (
    <div>
      <hr />
      <p>Title: {props.title}</p>
      <p>Summary: {props.description}</p>
      <p>Total Hours: {props.totalTime}</p>
      <p>Status: {props.status ? "Completed" : "In progress"}</p>
      <button>Delete</button>
      <EditGoal />
      <AddProgress />
    </div>
  );
};

export default GoalDetail;
