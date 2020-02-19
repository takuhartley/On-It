import React, { Component } from "react";
import './Nav.css';
export class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>Home</li>
            <li>Register</li>
            <li>Login</li>
            <li>About</li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
