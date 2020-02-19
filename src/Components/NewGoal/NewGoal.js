import React, { Component } from "react";

export class NewGoal extends Component {
  render() {
    return (
      <div>
        <p>Add a new goal!</p>
        <form>
          <input type="text"></input>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default NewGoal;
