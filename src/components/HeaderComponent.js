import React, { Component } from 'react'
import '../styles/Dashboard.css';
import TeamService from "../service/TeamService";
import UserService from "../service/UserService";

class HeaderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("teamId"),
            user: UserService.getCurrentUser(),
            team: ''
        }
        this.refreshHeader = this.refreshHeader.bind(this)
        this.logoutClicked = this.logoutClicked.bind(this)
    }

    componentDidMount() {
        this.refreshHeader();
    }

    logoutClicked(){
        localStorage.clear()
        this.props.history.push(``)
    }

    refreshHeader() {
        TeamService.getTeamById(this.state.id)
            .then(
                response => {
                    this.setState({ team: response.data })
                }
            )
    }

    render() {

        return (
            <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="basicExampleNav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <div style={{ fontFamily: "Arial", color: "yellow" }}>
                                <img src={this.state.team.logoImage} style={{ width: 60, height: 60, marginRight: 10 }} />
                                {this.state.team.name}
                            </div>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <button class="dropbtn">{this.state.user.username}<span class="glyphicon glyphicon-user" id="user-span"></span></button>
                        <div class="dropdown-content">
                            <a href="#"><span class="glyphicon glyphicon-user" style={{ marginRight: 10 }}></span>Profile</a>
                            <a href="#"><span class="glyphicon glyphicon-envelope" style={{ marginRight: 10 }}></span>Chat</a>
                            <a href="#"><span class="glyphicon glyphicon-stats" style={{ marginRight: 10 }}></span>Career</a>
                            <a href="#" onClick={this.logoutClicked}><span class="glyphicon glyphicon-log-out" style={{ marginRight: 10 }}></span>Log out</a>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default HeaderComponent