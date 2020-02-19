import React, { Component } from 'react'
import { useState } from 'react';

export class NewGoal extends Component {
    useState([
        { id: 123, title: "Complete MERN project", description: 'React Goal tracking project', hours: 2},
        { id: 234, title: "Complete VUE project", description: 'React Goal tracking project', hours: 2},
        { id: 345, title: "Complete MEAN project", description: 'React Goal tracking project', hours: 2}
    ])

    render() {
        return (
            <div>
                <p>Add a new goal!</p>
                <input type="text"></input>
                <button type="submit">Add</button>
            </div>
        )
    }
}

export default NewGoal
