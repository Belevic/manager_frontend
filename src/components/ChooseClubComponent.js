import React, { Component } from 'react'
import '../styles/Dashboard.css';
import LeagueService from "../service/LeagueService";
import TeamService from "../service/TeamService";
import UserService from '../service/UserService';

class ChooseClubComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            user: UserService.getCurrentUser(),
            league: '',
            updateUser: {
                id: 0,
                name: '',
                surname: '',
                login: '',
                password: '',
                role: ''
            },
            updateTeam: {
                manager: {
                    id: 0,
                    name: '',
                    surname: '',
                    login: '',
                    password: '',
                    role: ''
                }
            },
            teams: []
        }
        this.refreshClubs = this.refreshClubs.bind(this)
        this.takeClub = this.takeClub.bind(this)
    }

    componentDidMount() {
        this.refreshClubs();
    }

    takeClub(id) {
        TeamService.getTeamById(id)
            .then(
                response => {
                    this.setState({ updateTeam: response.data })
                    UserService.getUserById(this.state.user.id)
                        .then(
                            response => {
                                this.state.updateUser = response.data
                                localStorage.setItem("teamId", id)
                                this.state.updateTeam.manager = this.state.updateUser;
                                TeamService.updateTeam(id, this.state.updateTeam)
                                this.props.history.push(`/main`)
                            }
                        )
                }
            )
    }

    refreshClubs() {
        LeagueService.getLeagueById(this.state.id)
            .then(
                response => {
                    this.setState({ league: response.data })
                }
            )
        TeamService.getAllLeagueTeams(this.state.id)
            .then(
                response => {
                    this.setState({ teams: response.data })
                }
            )
    }

    render() {
        if (this.state.user.role === "USER") {
            return (
                <body>
                    <div id="background">
                    </div>
                    <div id="page-content" role="tablist" aria-multiselectable="true">
                        <div id="header" class="theme-panna-0">
                            <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="basicExampleNav">
                                    <ul class="navbar-nav mr-auto">
                                        <li class="nav-item active">
                                            <div style={{ fontFamily: "Arial", color: "yellow" }}>
                                                <img src={this.state.league.flagImage} style={{ width: 100, height: 55, marginRight: 10 }} />
                                                {this.state.league.name}
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="dropdown">
                                        <button class="dropbtn">{this.state.user.username}<span class="glyphicon glyphicon-user" id="user-span"></span></button>
                                        <div class="dropdown-content">
                                            <a href="#"><span class="glyphicon glyphicon-user" style={{ marginRight: 10 }}></span>Profile</a>
                                            <a href="#"><span class="glyphicon glyphicon-envelope" style={{ marginRight: 10 }}></span>Chat</a>
                                            <a href="#"><span class="glyphicon glyphicon-stats" style={{ marginRight: 10 }}></span>Career</a>
                                            <a href="#"><span class="glyphicon glyphicon-log-out" style={{ marginRight: 10 }}></span>Log out</a>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div id="subheader" class="theme-rabona-0" data-bind="css: { disabled: appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.NotInTutorial &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.End &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.TransferListGoHome &amp;&amp; SessionManager.hasTeam() }"><div class="page-spacing clearfix" data-bind="css: { 'tutorial-forced': appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() === TutorialStep.HomeOpenNotifications &amp;&amp; appViewModel.sessionSettings.screenSize() === ScreenSize.Xs }">
                            <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                                <div class="collapse navbar-collapse" id="basicExampleNav">
                                    <ul class="navbar-nav mr-auto">
                                        <li class="nav-item active">
                                            <a class="nav-link" href="#">
                                                <span class="sr-only">(current)</span>
                                                <i class="fa fa-home" style={{ marginRight: 3 }}></i>Home
                                        </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">
                                                <i class="fa fa-book" style={{ marginRight: 3 }}></i>About
                                        </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">
                                                <i class="fa fa-phone" style={{ marginRight: 3 }}></i>Contacts
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                            <div id="body-container">
                                <div class="row">
                                    <div class="body-content-container">
                                        <nav class="navbar navbar-expand-lg navbar-dark primary-color" style={{ marginRight: 10, marginBottom: -10 }}>
                                            <div class="collapse navbar-collapse" id="basicExampleNav">
                                                <ul class="navbar-nav mr-auto">
                                                    <li class="nav-item active">Choose Club
                                                </li>
                                                </ul>
                                                <form class="form-inline">
                                                    <div class="md-form my-0">
                                                        20 Clubs
                                                </div>
                                                </form>
                                            </div>
                                        </nav>
                                    </div>
                                    <div id="suggested">
                                        {
                                            this.state.teams.map(
                                                team =>
                                                    team.manager !== null ? (
                                                        <div class="col-md-3" style={{ marginTop: 10, textAlign: "center", color: "red" }}>
                                                            BLOCKED
                                                            <a id="isDisabled-link" href="/main/1">
                                                                <div id="league-disabled-item">
                                                                    <div class="row">
                                                                        <div class="col-md-12" style={{ textAlign: "center" }}>
                                                                            <img class="league-logo" title={team.name} src={team.logoImage} />
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-md-12" style={{ textAlign: "center", marginTop: 10, color: "white" }}>
                                                                            <div>
                                                                                <span class="league-type-name" data-bind="text: name">{team.name}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-md-12" id="league-aims">
                                                                            <div class="col-md-12" style={{ fontSize: 14 }}>
                                                                                Place aim: {team.aim}
                                                                            </div>

                                                                            <div class="col-md-12" style={{ fontSize: 14 }}>
                                                                                Player number: 21
                                                                    </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    )
                                                        : (
                                                            <div class="col-md-3" style={{ marginTop: 10, textAlign: "center", color: "red" }}>

                                                                <a id="link" href="#" onClick={() => { this.takeClub(team.id) }}>
                                                                    <div id="league-item">
                                                                        <div class="row">
                                                                            <div class="col-md-12" style={{ textAlign: "center" }}>
                                                                                <img class="league-logo" title={team.name} src={team.logoImage} />
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-12" style={{ textAlign: "center", marginTop: 10, color: "white" }}>
                                                                                <div>
                                                                                    <span class="league-type-name" data-bind="text: name">{team.name}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-12" id="league-aims">
                                                                                <div class="col-md-12" style={{ fontSize: 14 }}>
                                                                                    Place aim: {team.aim}
                                                                                </div>
                                                                                <div class="col-md-12" style={{ fontSize: 14 }}>
                                                                                    Player number: 21
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>

            )
        }
        else {
            return (
                <div style={{ backgroundColor: "gray" }}>
                    <div style={{ fontSize: 40, textAlign: "center" }}>
                        UNAUTHORISED
                    </div>
                    <div style={{ fontSize: 20, textAlign: "center" }}>
                        <a href="/">Please, enter into the system</a>
                    </div>
                </div>
            )
        }
    }
}

export default ChooseClubComponent