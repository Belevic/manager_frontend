import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Player.css';
import TeamService from "../service/TeamService";
import SquadService from "../service/SquadService";
import PlayerService from "../service/PlayerService";
import ProgressBar from 'react-bootstrap/ProgressBar';

import PropTypes from 'prop-types';

export default class Draggable extends Component {

    drag = (e) => {
       
        e.dataTransfer.setData('transfer', e.target.id);
        
    }

    noAllowDrop = (e) => {
        e.stopPropagation();
    }

    render() {

        return (
            <div id={this.props.id} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        )

    }
}

Draggable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
}