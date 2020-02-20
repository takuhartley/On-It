import React, {useState}from "react";

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
  const textChangeHanlder = e => {
    setEnteredText(e.target.value);
  };

  return (
    <form onSubmit={addGoalHandler}>
      <input type="text" value={enteredText} onChange={textChangeHanlder} />
      <button type="submit">Add</button>
    </form>
  );
};

export default CreateGoal;
