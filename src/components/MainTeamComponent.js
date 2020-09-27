import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/MainTeam.css';
import TeamService from "../service/TeamService";
import MatchService from '../service/MatchService';
import FixtureService from '../service/FixtureService';
import FinancesService from '../service/FinancesService';
import UserService from '../service/UserService';
import HeaderComponent from './HeaderComponent';
import SubheaderComponent from './SubheaderComponent';

class MainTeamComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("teamId"),
            user: UserService.getCurrentUser(),
            fixture: '',
            team: '',
            guestTeam: {
                manager: {
                    name: ''
                }
            },
            finances: '',
            referee: '',
            isOpen: false,
            teams: []
        }
        this.refreshTeam = this.refreshTeam.bind(this)
    }

    componentDidMount() {
        this.refreshTeam();
    }

    toggleModal = e => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    refreshTeam() {
        FinancesService.getFinancesByTeamId(localStorage.getItem("teamId"))
            .then(
                response => {
                    this.setState({ finances: response.data })
                }
            )
        FixtureService.getFixtureById(localStorage.getItem("fixtureId"))
            .then(
                response => {
                    this.setState({ fixture: response.data })
                    MatchService.getMatchByHomeOrGuestTeamId(localStorage.getItem("teamId"), response.data.id)
                        .then(
                            response => {
                                this.setState({ referee: response.data.referee })
                                if (response.data.homeTeam.id !== this.state.id) {
                                    TeamService.getTeamById(response.data.guestTeam.id)
                                        .then(
                                            response => {
                                                this.setState({ guestTeam: response.data })
                                            }
                                        )
                                }
                                else {
                                    TeamService.getTeamById(response.data.homeTeam.id)
                                        .then(
                                            response => {
                                                this.setState({ guestTeam: response.data })
                                            }
                                        )
                                }
                            }
                        )
                }
            )
        TeamService.getTeamById(this.state.id)
            .then(
                response => {
                    this.setState({ team: response.data })
                }
            )
        TeamService.getSortedLeagueTeams(localStorage.getItem("leagueId"))
            .then(
                response => {
                    this.setState({ teams: response.data.slice(0, 4) })
                }
            )
    }

    render() {
        if (this.state.user.role === "USER") {
            return (
                <body>
                    <div id="background" style={{ height: 728 }}>
                    </div>

                    <div id="page-content" role="tablist" aria-multiselectable="true">
                        <div id="main-header" class="theme-panna-1">
                            <HeaderComponent />
                        </div>
                        <div id="main-subheader" class="theme-rabona-1" data-bind="css: { disabled: appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.NotInTutorial &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.End &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.TransferListGoHome &amp;&amp; SessionManager.hasTeam() }"><div class="page-spacing clearfix" data-bind="css: { 'tutorial-forced': appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() === TutorialStep.HomeOpenNotifications &amp;&amp; appViewModel.sessionSettings.screenSize() === ScreenSize.Xs }">
                            <SubheaderComponent />
                        </div>
                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8">
                                    <div class="match-versus">
                                        <div class="row">
                                            <div class="col">
                                            </div>
                                            <div class="col">
                                                <div class="timer">
                                                    <div class="timer-info">
                                                        Next match
                                            </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <img src={this.state.team.logoImage} style={{ height: 120, width: 120 }} />
                                        </div>

                                        <div class="col-md-8" style={{ textAlign: "center" }}>
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJCuFhyMTXY3nEPIGvLZlcsLlWqoBm2cL8DrS2xnFDuydHH-Fm&usqp=CAU" style={{ height: 120, width: 120 }} />
                                        </div>
                                        <div class="col-md-2">

                                            <img src={this.state.guestTeam.logoImage} style={{ height: 120, width: 120 }} />
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3" style={{ textAlign: "left", fontSize: 20 }}>
                                                {this.state.team.name}
                                            </div>
                                            <div class="col-md-6">
                                            </div>
                                            <div class="col-md-3" style={{ textAlign: "right", fontSize: 20 }}>

                                                {this.state.guestTeam.name}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-2" style={{ textAlign: "center" }}>
                                                Coach: Pavel
                                        </div>
                                            <div class="col-md-8" style={{ textAlign: "center" }}>
                                                Referee: {this.state.referee.name} {this.state.referee.surname}
                                            </div>
                                            {
                                                this.state.guestTeam.manager === null ?
                                                    (
                                                        <div class="col-md-2" style={{ textAlign: "center" }}>
                                                            Coach: computer
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div class="col-md-2" style={{ textAlign: "center" }}>
                                                            Coach: {this.state.guestTeam.manager.name}
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2"></div>
                            </div>
                            <div class="row" style={{ marginTop: 20 }}>
                                <div class="col-md-4">
                                    <div class="transfer-news">
                                        <div class="row">
                                            <div class="col-md-4">
                                            </div>
                                            <div class="col-md-4" id="transfer-title">
                                                Transfer news
                                        </div>
                                            <div class="col-md-4">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-1">
                                            </div>
                                            <div class="col-md-10" id="transfer-info">
                                                New players available on transfer!
                                        </div>
                                            <div class="col-md-1">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="training-news" style={{ marginTop: 20 }}>
                                        <div class="row">
                                            <div class="col-md-4">
                                            </div>
                                            <div class="col-md-4" id="training-title">

                                                Training news
                                        </div>
                                            <div class="col-md-4">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-1">
                                            </div>
                                            <div class="col-md-10" id="training-info">
                                                Forward coach is available!
                                        </div>
                                            <div class="col-md-1">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="league-table">
                                        <table class="table table-borderless table-striped table-dark" id="league-tab">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>

                                                        <a id="link-table" href="/table">
                                                            <h3 id="league-table-title">League table</h3>
                                                        </a></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.teams.map(
                                                        team => <tr key={team.id}>
                                                            <td></td>
                                                            <td><img src={team.logoImage} style={{ height: 20, width: 20, marginRight: 10 }} /> {team.name}</td>

                                                            <td>{team.points}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                <div class="col-md-4">
                                    <div class="squad-news">
                                        <div class="row">
                                            <div class="col-md-4">
                                            </div>
                                            <div class="col-md-4" id="squad-title">

                                                Line up news
                                        </div>
                                            <div class="col-md-4">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-1">
                                            </div>
                                            <div class="col-md-10" id="squad-info">
                                                Not enough substitues!
                                        </div>
                                            <div class="col-md-1">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="management-news" style={{ marginTop: 20 }}>
                                        <div class="row">
                                            <div class="col-md-4">
                                            </div>
                                            <div class="col-md-4" id="management-title">
                                                Club news
                                        </div>
                                            <div class="col-md-4">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-1">
                                            </div>
                                            <div class="col-md-10" id="management-info">
                                                Boss is not happy!
                                            </div>
                                            <div class="col-md-1">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body >
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

export default MainTeamComponent