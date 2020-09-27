import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Login.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

class ProgressBarComponent extends Component {

    render() {
        if (this.props.value < 40) {
            return (
                <ProgressBar variant="danger" now={this.props.value} />
            )
        }
        else if ((40 < this.props.value) && (this.props.value < 75)) {
            return (
                <ProgressBar variant="warning" now={this.props.value} />
            )
        }
        else {
            return (
                <ProgressBar variant="success" now={this.props.value} />
            )
        }

    }
}

export default ProgressBarComponent