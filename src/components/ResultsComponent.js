import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Results.css';
import TeamService from "../service/TeamService";
import MatchService from "../service/MatchService";
import UserService from "../service/UserService";
import FinancesService from "../service/FinancesService";
import HeaderComponent from './HeaderComponent';
import Modal from "react-bootstrap/Modal";
import SubheaderComponent from './SubheaderComponent';

class ResultsComponent extends Component {

    constructor(props) {
        super(props)
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            id: localStorage.getItem("teamId"),
            user: UserService.getCurrentUser(),
            team: '',
            match: {
                id: 0,
                homeScored: 0,
                guestScored: 0,
                homeTeam: {
                    name: '',
                    logoImage : ''

                },
                guestTeam: {
                    name: '',
                    logoImage : ''
                },
                referee: {
                    name: '',
                    surname: ''
                }
            },
            goalstats: [{ player: { name: '', surname: '' }, time: '', event: '', match: { id: 0 } }],
            assiststats: [{ player: { name: '', surname: '' }, time: '', event: '', match: { id: 0 } }],
            finances: '',
            isOpen: false,
            index: 1,
            showModal: false,
            fixtureList: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
            { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
            { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }, { id: 30 },
            { id: 31 }, { id: 32 }, { id: 33 }, { id: 34 }, { id: 35 }, { id: 36 }, { id: 37 }, { id: 38 }],
            matches: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
            [], [], [], [], [], [], [], [], [], [], [], [], [], []],
            date: date
        }
        this.refreshResults = this.refreshResults.bind(this)
        this.onClickBack = this.onClickBack.bind(this);
        this.onClickForward = this.onClickForward.bind(this);
        this.chooseMatch = this.chooseMatch.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
    }

    componentDidMount() {
        this.refreshResults();
    }

    chooseMatch(match) {
        this.state.match = match
        this.handleOpenModal();
    }

    handleOpenModal() {
        this.state.showModal = true;
    }

    handleCloseModal() {
        this.setState({showModal:false});
    }

    toggleModal = e => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onClickForward() {
        if (this.state.index + 1 === this.state.fixtureList.length) {
            this.setState({
                index: 0
            })
        }
        else {
            this.setState({
                index: this.state.index + 1
            })
        }
    }

    onClickBack() {
        if (this.state.index - 1 === -1) {
            this.setState({
                index: this.state.fixtureList.length - 1
            })
        }
        else {
            this.setState({
                index: this.state.index - 1
            })
        }
    }

    refreshResults() {
        FinancesService.getFinancesByTeamId(localStorage.getItem("teamId"))
            .then(
                response => {
                    this.setState({ finances: response.data })
                }
            )
        MatchService.getGroupByFixtureMatches()
            .then(
                response => {
                    for (let i = 0; i < 38; i++) {
                        for (let j = 0; j < response.data[i].length; j++) {
                            this.state.matches[i][j] = response.data[i][j]
                        }
                    }
                })
        TeamService.getTeamById(this.state.id)
            .then(
                response => {
                    this.setState({ team: response.data })
                }
            )
        MatchService.getMatchStatisticsByFixtureId(localStorage.getItem("fixtureId")).then(
            response => {
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].length; j++) {
                        if (response.data[i][j].event === "Goal") {
                            this.state.goalstats.push(response.data[i][j])
                        }
                        else if (response.data[i][j].event === "Assist") {
                            this.state.assiststats.push(response.data[i][j])
                        }
                    }
                }
            }
        )

    }

    render() {
        
        const { showModal } = this.state;
        if (this.state.user.role === "USER") {
            return (
                <body>
                    <div id="background" >
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                        <Modal.Header style={{ backgroundColor: ' rgba(1, 41, 82, .65)', color: "white" }}>Check match results</Modal.Header>
                        <Modal.Body style={{ backgroundColor: 'rgba(3, 16, 31, 0.65)' }}>
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

                                        <tr key={this.state.match.id}>
                                            <td><img src={this.state.match.homeTeam.logoImage} style={{ height: 70, width: 70 }} /></td>
                                            <td style={{ fontSize: 12 }}>{this.state.match.homeTeam.name}</td>
                                            <td style={{ fontSize: 20 }}>{this.state.match.homeScored} - {this.state.match.guestScored}</td>
                                            <td style={{ fontSize: 12 }}>{this.state.match.guestTeam.name}</td>
                                            <td><img src={this.state.match.guestTeam.logoImage} style={{ height: 70, width: 70 }} /></td>
                                        </tr>

                                    }
                                </tbody>
                            </table>
                            <div style={{textAlign : "center", marginBottom: 10, color: "white"}}>Referee: {this.state.match.referee.name} {this.state.match.referee.surname}</div>
                            <div class="col-md-7"
                            >
                                <table class="table table-borderless" >
                                    <thead>
                                        <tr style={{ width: 200 }}>
                                            <th style={{ width: 200 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ width: 200, fontSize: 10 }}>
                                        {
                                            this.state.goalstats.filter(goal => goal.match.id === this.state.match.id)
                                                .map(
                                                    goal =>
                                                        <tr style={{ width: 200, color: "white" }}><td style={{ width: 200 }}>{goal.time}   <img src="https://pluspng.com/img-png/png-for-football-football-ball-png-500.png" style={{ width: 10, height: 10 }} />  {goal.player.name} {goal.player.surname}.</td></tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-5">
                                <table class="table table-borderless" >
                                    <thead>
                                        <tr style={{ width: 200 }}>
                                            <th style={{ width: 200 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ width: 200, fontSize: 10, height:30 }}>
                                        {
                                            this.state.assiststats.filter(goal => goal.match.id === this.state.match.id)
                                                .map(
                                                    goal =>
                                                        <tr style={{ width: 200, color: "white",height:30  }}><td style={{ height:30 ,width: 200 }}>Assisted by {goal.player.name} {goal.player.surname}.</td></tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: 'rgba(3, 16, 31, 0.65)', border: "none" }}>
                            <button id="add-cancel" onClick={this.handleCloseModal}>Back</button>
                        </Modal.Footer>
                    </Modal>
                    <div id="page-content" role="tablist" aria-multiselectable="true">
                        <div id="main-header" class="theme-panna-1">
                            <HeaderComponent />
                        </div>
                        <div id="main-subheader" class="theme-rabona-1" data-bind="css: { disabled: appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.NotInTutorial &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.End &amp;&amp; appViewModel.tutorialPartial().tutorialStep() !== TutorialStep.TransferListGoHome &amp;&amp; SessionManager.hasTeam() }"><div class="page-spacing clearfix" data-bind="css: { 'tutorial-forced': appViewModel.tutorialPartial() &amp;&amp; appViewModel.tutorialPartial().tutorialStep() === TutorialStep.HomeOpenNotifications &amp;&amp; appViewModel.sessionSettings.screenSize() === ScreenSize.Xs }">
                            <SubheaderComponent />
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
                                                                <td style={{ fontSize: 20 }}><a id="link-col" href="#" onClick={() => this.chooseMatch(match)}>{match.homeScored} - {match.guestScored}</a></td>
                                                                <td style={{ fontSize: 12 }}>{match.guestTeam.name}</td>
                                                                <td><img src={match.guestTeam.logoImage} style={{ height: 70, width: 70 }} /></td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-4" id="movebar">
                                        <div style={{ marginTop: 10, fontSize: 20 }}>Current matchday</div>
                                        <div class="row">
                                            <div class="col-md-5" style={{ textAlign: "center", marginTop: 20, fontSize: 20, color: "goldenrod" }}>
                                                Matchday: {this.state.fixtureList[this.state.index].id}
                                            </div>
                                            <div class="col-md-2" style={{ textAlign: "center", marginTop: 20 }}>

                                            </div>
                                            <div class="col-md-5" style={{ textAlign: "center", marginTop: 20, fontSize: 20, color: "goldenrod" }}>
                                                Date: {this.state.date}
                                            </div>
                                        </div>
                                        <div class="row" style={{ align: "center" }}>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 20 }}>
                                                <button class="btn btn-success" onClick={this.onClickBack} id="back-button"><i class="fa fa-arrow-left"></i></button>
                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
                                                <div class="row" id="round-row">
                                                    <div id="matchday-near-round">{this.state.fixtureList[this.state.index].id - 1}</div>
                                                    <div id="matchday-round">{this.state.fixtureList[this.state.index].id}</div>
                                                    <div id="matchday-near-round">{this.state.fixtureList[this.state.index].id + 1}</div>
                                                </div>
                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 20 }}>
                                                <button class="btn btn-success" onClick={this.onClickForward} id="forward-button"><i class="fa fa-arrow-right"></i></button>
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

export default ResultsComponent