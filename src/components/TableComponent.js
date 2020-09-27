import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Table.css';
import TeamService from "../service/TeamService";
import HeaderComponent from './HeaderComponent';
import SubheaderComponent from './SubheaderComponent';

class TableComponent extends Component {

    constructor(props) {
        super(props)
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            id: localStorage.getItem("teamId"),
            team: '',
            isOpen: false,
            index: 1,
            teams: [],
            date: date
        }
        this.refreshTable = this.refreshTable.bind(this)
    }

    componentDidMount() {
        this.refreshTable();
    }

    toggleModal = e => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    refreshTable() {
        TeamService.getTeamById(this.state.id)
            .then(
                response => {
                    this.setState({ team: response.data })
                }
            )
        TeamService.getSortedLeagueTeams(this.state.id)
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
                    <div id="background" >
                    </div>

                    <div id="page-content" role="tablist" aria-multiselectable="true">
                        <div id="main-header" class="theme-panna-1">
                            <HeaderComponent />
                        </div>
                        <div id="main-subheader" class="theme-rabona-1" data-bind="css: { disabled: appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.NotInTutorial &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.End &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.TransferListGoHome &amp;&amp; SessionManager.hasTeam() }"><div class="page-spacing clearfix" data-bind="css: { 'tutorial-forced': appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() === TutorialStep.HomeOpenNotifications &amp;&amp; appViewModel.sessionSettings.screenSize() === ScreenSize.Xs }">
                            <SubheaderComponent />
                        </div>
                            <div id="body-container">
                                <div class="body-content-container">
                                    League Table
                            </div>
                                <div class="row" id="ro">
                                    <div class="col-md-9" id="results">
                                        <table class="table table-borderless table-striped table-dark" id="result-league" >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Club</th>
                                                    <th>Played</th>
                                                    <th>Wins</th>
                                                    <th>Draws</th>
                                                    <th>Loses</th>
                                                    <th>GS</th>
                                                    <th>GA</th>
                                                    <th>GD</th>
                                                    <th>Points</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    this.state.teams.map(
                                                        team =>
                                                            <tr key={team.id}>
                                                                <td style={{ textAlign: "left" }}></td>
                                                                <td>{team.name}</td>
                                                                <td>{0}</td>
                                                                <td>{team.wins}</td>
                                                                <td>{team.draws}</td>
                                                                <td>{team.loses}</td>
                                                                <td>{team.scored}</td>
                                                                <td>{team.against}</td>
                                                                <td>{team.scored - team.against}</td>
                                                                <td>{team.points}</td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
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

export default TableComponent