import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Dashboard.css';
import MatchService from "../service/MatchService";
import TeamService from "../service/TeamService";
import FixtureService from '../service/FixtureService';

class AdminComponent extends Component {

    constructor(props) {
        super(props)
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            id: localStorage.getItem("teamId"),
            team: '',
            isOpen: false,
            index: 1,
            matches: [[], [], [], [], [], []],
            date: date
        }
        this.refreshResults = this.refreshResults.bind(this)
        this.onClickForward = this.onClickForward.bind(this)
        this.onClickAddFixtures = this.onClickAddFixtures.bind(this)
        this.onClickAddMatchShedule = this.onClickAddMatchShedule.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this)
    }

    componentDidMount() {
        this.refreshResults();
    }

    toggleModal = e => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logoutClicked(){
        localStorage.clear()
        this.props.history.push(``)
    }

    onClickForward() {
        FixtureService.playMatches(19);
        window.location.reload(false);
    }

    onClickAddMatchShedule() {
        MatchService.generateMatchShedule(localStorage.getItem("leagueId"));
        window.location.reload(false);
    }

    onClickAddFixtures() {
        alert(localStorage.getItem("leagueId"))
        FixtureService.generateFixtureShedule(localStorage.getItem("leagueId"))
        window.location.reload(false);
    }

    refreshResults() {
        MatchService.getGroupByFixtureMatches()
            .then(
                response => {
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < response.data[i].length; j++) {
                            this.state.matches[i][j] = response.data[i][j]
                        }
                    }
                })
      
    }

    render() {

        return (
            <body>
                <div id="background" >
                </div>

                <div id="page-content" role="tablist" aria-multiselectable="true">
                    <div id="main-header" class="theme-panna-1">
                        <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                                aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="basicExampleNav">
                                <ul class="navbar-nav mr-auto">
                                    <li class="nav-item active">
                                        <div style={{ fontFamily: "Arial", color: "yellow" }}>
                                          
                                        </div>
                                    </li>
                                </ul>
                                <div class="dropdown">
                                    <button class="dropbtn">{localStorage.getItem("login")}<span class="glyphicon glyphicon-user" id="user-span"></span></button>
                                    <div class="dropdown-content">
                                        <a href="#"><span class="glyphicon glyphicon-user" style={{ marginRight: 10 }}></span>Profile</a>
                                        <a href="#"><span class="glyphicon glyphicon-envelope" style={{ marginRight: 10 }}></span>Chat</a>
                                        <a href="#"><span class="glyphicon glyphicon-stats" style={{ marginRight: 10 }}></span>Career</a>
                                        <a href="#" onClick={this.logoutClicked}><span class="glyphicon glyphicon-log-out" style={{ marginRight: 10 }}></span>Log out</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div id="main-subheader" class="theme-rabona-1" data-bind="css: { disabled: appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.NotInTutorial &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.End &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.TransferListGoHome &amp;&amp; SessionManager.hasTeam() }"><div class="page-spacing clearfix" data-bind="css: { 'tutorial-forced': appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() === TutorialStep.HomeOpenNotifications &amp;&amp; appViewModel.sessionSettings.screenSize() === ScreenSize.Xs }">
                        <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                                aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="basicExampleNav">
                                <ul class="navbar-nav mr-auto">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/main">
                                            <i class="fa fa-home" style={{ marginRight: 3 }}></i>Home
                                             <span class="sr-only">(current)</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/training">
                                            <i class="fa fa-futbol" style={{ marginRight: 3 }}></i>Training
                                    </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/results">
                                            <i class="fa fa-calendar" style={{ marginRight: 3 }}></i>Shedule
                                    </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">
                                            <i class="fa fa-user-md" style={{ marginRight: 3 }}></i>Stuff
                                    </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/transfer" >
                                            <i class="fa fa-exchange-alt" style={{ marginRight: 3 }}></i>Transfers
                                    </a>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-tshirt" style={{ marginRight: 3 }}></i>Team
                                            </a>
                                        <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                                            <a class="dropdown-item" href="/squad">Squad</a>
                                            <a class="dropdown-item" href="/line">Line up</a>
                                            <a class="dropdown-item" href="/tactics">Tactics</a>
                                        </div>
                                    </li>
                                </ul>


                            </div>
                        </nav>
                    </div>
                        <div id="body-container">
                            <div class="body-content-container">
                                Results and calendar
                            </div>
                            <div class="row" id="ro">
                                <div class="col-md-7" id="results">
                                    <table class="table table-borderless table-striped table-dark" id="results-table" >
                                        <thead>
                                            <tr>
                                                <th>Home</th>
                                                <th></th>
                                                <th>Matchday {this.state.index}</th>
                                                <th></th>
                                                <th>Away</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                this.state.matches[this.state.index].map(
                                                    match =>
                                                        <tr key={match.id}>
                                                            <td><img src={match.homeTeam.logoImage} style={{ height: 70, width: 70 }} /></td>
                                                            <td style={{ fontSize: 12 }}>{match.homeTeam.name}</td>
                                                            <td style={{ fontSize: 20 }}>{match.homeScored} - {match.guestScored}</td>
                                                            <td style={{ fontSize: 12 }}>{match.guestTeam.name}</td>
                                                            <td><img src={match.guestTeam.logoImage} style={{ height: 70, width: 70 }} /></td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                {
                                    this.state.matches.length === 0 ? (
                                        <div class="col-md-4" id="movebar">
                                            Play matches
                                            <div class="row">
                                                No matches already
                                            </div>
                                            <div class="row" style={{ align: "center" }}>
                                                <button class="btn btn-success" onClick={this.onClickAddFixtures} id="forward-button">Add fixtures</button>
                                            </div>
                                        </div>
                                    )
                                        :
                                        (
                                            <div class="col-md-4" id="movebar">
                                                Play matches
                                                <div class="row">
                                                    <div class="col-md-5" style={{ textAlign: "center", marginTop: 20, fontSize: 20, color: "goldenrod" }}>
                                                        Matchday: {this.state.matches[this.state.index].id}
                                                    </div>
                                                    <div class="col-md-2" style={{ textAlign: "center", marginTop: 20 }}>

                                                    </div>
                                                    <div class="col-md-5" style={{ textAlign: "center", marginTop: 20, fontSize: 20, color: "goldenrod" }}>
                                                        Date: {this.state.date}
                                                    </div>
                                                </div>
                                                <div class="row" style={{ align: "center" }}>
                                                    <button class="btn btn-success" onClick={this.onClickForward} id="forward-button">Play fixture</button>
                                                </div>
                                                 <div class="row" style={{ align: "center" }}>
                                                    <button class="btn btn-success" onClick={this.onClickAddMatchShedule} id="forward-button">Generate match shedule</button>
                                                </div>

                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </body >
        )
    }
}

export default AdminComponent