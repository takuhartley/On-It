import React from "react";

const NewGoal = props => {
  const addGoalHandler = e => {
    e.preventDefault();
    const newGoal = {
      id: Math.random().toString(),
      title: "My New Goal",
      description: "New Goal",
      hours: 1
    };
    props.onAddGoal(newGoal);
  };
  return (
    <form onSubmit={addGoalHandler}>
      <input type="text" />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewGoal;
