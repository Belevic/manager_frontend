import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Player.css';
import TeamService from "../service/TeamService";
import SquadService from "../service/SquadService";
import PlayerService from "../service/PlayerService";
import PropTypes from 'prop-types';

export default class DroppableSquad extends Component {

    constructor(props) {
        super(props)
        this.state = {
            player: '',
            editPlayer: ''
        }
    }

    drop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        e.target.appendChild(document.getElementById(data))
        PlayerService.getPlayerById(data)
        .then(
            response => {
                alert(response.data.inLineUp);
                this.setState({player:response.data})
                this.state.player.inLineUp = false;
                PlayerService.updatePlayer(data,this.state.player);
            }
        )
    }

    allowDrop = (e) => {
        e.preventDefault();
    }

    render() {

        return (
            <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        )
                  
    }
}

DroppableSquad.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
}