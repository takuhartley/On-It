import React, { useState } from "react";

const CreateGoal = props => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDuration, setEnteredDuration] = useState("");
  const [enteredCompleted, setEnteredCompleted] = useState(false);

  const submitHandler = event => {
    event.preventDefault();
    props.onAddGoal({
      title: enteredTitle,
      description: enteredDescription,
      duration: enteredDuration
    });
  };

  return (
    <div>
      <h1>Add a New Goal</h1>
      <form onSubmit={submitHandler}>
        <label>Title</label>
        <input
          type="text"
          value={enteredTitle}
          onChange={event => {
            setEnteredTitle(event.target.value);
          }}
        />

        <label>Description</label>
        <input
          type="text"
          value={enteredDescription}
          onChange={event => {
            setEnteredDescription(event.target.value);
          }}
        />

        <label>Total Hours:</label>
        <input
          type="text"
          value={enteredDuration}
          onChange={event => {
            setEnteredDuration(event.target.value);
          }}
        />

        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
};

export default CreateGoal;
