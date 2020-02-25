import React from "react";

const AddProgress = props => {
  return (
    <div>
      <label>Add Description</label>
      <input type="text" />
      <label>Add Hours</label>
      <input type="text" />
      <button type="submit">Add Progress</button>
    </div>
  );
};

export default AddProgress;
