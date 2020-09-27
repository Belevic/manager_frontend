import React, { Component } from 'react'
import '../styles/Dashboard.css';
import LeagueService from "../service/LeagueService";
import TeamService from "../service/TeamService";
import UserService from '../service/UserService';

class DashboardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: UserService.getCurrentUser(),
            team: {
                manager: {
                    id: 0,
                    name: '',
                    surname: '',
                    login: '',
                    password: '',
                    role: ''
                }
            },
            leagues: []
        }
        this.refreshLeagues = this.refreshLeagues.bind(this)
        this.movement = this.movement.bind(this)
    }

    componentDidMount() {
        this.refreshLeagues();
    }

    movement(id) {
        LeagueService.getLeagueById(id)
            .then(
                response => {
                    localStorage.setItem("fixtureId", response.data.currentFixture + 18)
                }
            )
        if (this.state.user.role === "USER") {
            if (this.state.team.manager.id == 0) {
                this.props.history.push(`/choose/${id}`)
            }
            else {
                localStorage.setItem("teamId", this.state.team.id)
                localStorage.setItem("leagueId", id)
                this.props.history.push(`/main`)
            }
        }
        else if (this.state.user.role === "ADMIN") {
            localStorage.setItem("leagueId", id)
            this.props.history.push(`/admin`)
        }
    }

    refreshLeagues() {
        LeagueService.getAllLeagues()
            .then(
                response => {
                    this.setState({ leagues: response.data })
                },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString();
                    this.setState({
                        leagues: resMessage
                    });
                }
            )
        TeamService.getTeamByManagerId(this.state.user.id)
            .then(
                response => {
                    this.setState({ team: response.data })
                }
            )
    }

    render() {
        if (this.state.user.role === "USER" || this.state.user.role === "ADMIN") {
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
                                                <img src='https://s3.amazonaws.com/gt7sp-prod/decal/52/21/54/6278668868833542152_1.png' style={{ width: 60, height: 60, marginRight: 10 }} />
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
                                        Choose League
                                </div>
                                    <div id="suggested">

                                        {
                                            this.state.leagues.map(
                                                league =>
                                                    <div class="col-md-3" style={{ marginTop: 10, textAlign: "center", color: "red" }}>

                                                        <a id="link" href="#" onClick={() => { this.movement(league.id) }}>
                                                            <div id="league-item">
                                                                <div class="row">
                                                                    <div class="col-md-12" style={{ textAlign: "center" }}>
                                                                        <img class="league-logo" title={league.name} src={league.flagImage} />
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12" style={{ textAlign: "center", marginTop: 10, color: "white" }}>
                                                                        <div>
                                                                            <span class="league-type-name" data-bind="text: name">{league.name}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12" id="league-aims">
                                                                        <div class="col-md-12" style={{ fontSize: 14 }}>
                                                                            Championship:<span class="glyphicon glyphicon-remove" style={{ marginLeft: 10, backgroundColor: "red" }}></span>
                                                                        </div>
                                                                        <div class="col-md-12" style={{ fontSize: 14 }}>
                                                                            Place aim:<span class="glyphicon glyphicon-remove" style={{ marginLeft: 10, backgroundColor: "red" }}></span>
                                                                        </div>

                                                                        <div class="col-md-12" style={{ fontSize: 14 }}>
                                                                            League cup:<span class="glyphicon glyphicon-ok" style={{ marginLeft: 10, backgroundColor: "green" }}></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
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
                    <div style={{ fontSize: 20, textAlign: "center"}}>
                        <a href="/">Please, enter into the system</a>
                    </div>
                </div>
            )
        }
    }
}

export default DashboardComponent