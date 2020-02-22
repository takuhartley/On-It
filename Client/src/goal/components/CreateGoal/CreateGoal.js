import React, { useState} from "react";

const CreateGoal = props => {
  const [enteredText, setEnteredText] = useState('')
  const addGoalHandler = e => {
    e.preventDefault();
    const newGoal = {
      id: Math.random().toString(),
      title: enteredText,
      description: "New Goal",
      hours: 1
    };
    setEnteredText('');
    props.onAddGoal(newGoal);

  };

  const setTitleHandler = e => {
    console.log(e.target.value);
  }
  const setDescriptionHandler = e => {
    console.log(e.target.value);
  }
  const setTotalTimeHanlder = e => {
    console.log(e.target.value);
  }
  

  return (
    <h1>Add a New Goal</h1>
    <form onSubmit={addGoalHandler}>
      <input type="text" value={enteredText} onChange={setTitleHandler} />
      <input type="text" value={enteredText} onChange={setDescriptionHandler} />
      <input type="text" value={enteredText} onChange={setTotalTimeHanlder} />
      <button type="submit">Add</button>
    </form>
  );
};

export default CreateGoal;
