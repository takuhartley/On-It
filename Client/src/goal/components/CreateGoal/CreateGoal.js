import React, { useState } from "react";

// CSS
import "./CreateGoal.css";

const CreateGoal = props => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDuration, setEnteredDuration] = useState("");
  const [enteredStatus, setEnteredStatus] = useState(false);

  const submitHandler = event => {
    event.preventDefault();
    props.onAddGoal({
      title: enteredTitle,
      description: enteredDescription,
      duration: enteredDuration
    });
  };

  return (
    <div className="CreateGoal">
      <h1 className="title">Add a New Goal</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={event => {
              setEnteredTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={enteredDescription}
            onChange={event => {
              setEnteredDescription(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Total Hours:</label>
          <input
            type="text"
            value={enteredDuration}
            onChange={event => {
              setEnteredDuration(event.target.value);
            }}
          />
        </div>
        Î<button type="submit">Create Goal</button>
      </form>
    </div>
  );
};

export default CreateGoal;
