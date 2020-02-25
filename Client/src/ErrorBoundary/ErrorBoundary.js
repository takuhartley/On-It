import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ""
    };
    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errerMessage: error})
    }
    render() {
        if (this.state.hasError === true) {
            return <h1>{this.state.errorMessage}</h1>
        } else {
            return this.props.children

        }
    }
}

export default ErrorBoundary
