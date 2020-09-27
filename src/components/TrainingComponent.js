import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Training.css';
import TeamService from "../service/TeamService";
import FinancesService from "../service/FinancesService";
import TrainingService from "../service/TrainingService";
import PlayerService from "../service/PlayerService";
import ProgressBar from 'react-bootstrap/ProgressBar';
import HeaderComponent from './HeaderComponent';
import SubheaderComponent from './SubheaderComponent';
import UserService from '../service/UserService';

class TrainingComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("teamId"),
            team: '',
            user: UserService.getCurrentUser(),
            finances: '',
            isOpen: false,
            forwardDisabled: false,
            forwardBoostDisabled: true,
            midlefielderDisabled: false,
            midlefielderBoostDisabled: true,
            defenderDisabled: false,
            defenderBoostDisabled: true,
            keaperDisabled: false,
            keaperBoostDisabled: true,
            forwardImage: '',
            midlefielderImage: '',
            defenderImage: '',
            keaperImage: '',
            forwardIndex: 0,
            current_forward: '',
            midlefielderIndex: 0,
            current_midlefielder: '',
            defenderIndex: 0,
            current_defender: '',
            keaperIndex: 0,
            current_keaper: '',
            players: [],
            forwards: [],
            midlefielders: [],
            defenders: [],
            goalkeapers: [],
            training: ''
        }
        this.refreshTable = this.refreshTable.bind(this)
        this.onClickDownForward = this.onClickDownForward.bind(this);
        this.onClickUpForward = this.onClickUpForward.bind(this);
        this.onClickUpMidlefielder = this.onClickUpMidlefielder.bind(this);
        this.onClickDownMidlefielder = this.onClickDownMidlefielder.bind(this);
        this.onClickUpDefender = this.onClickUpDefender.bind(this);
        this.onClickDownDefender = this.onClickDownDefender.bind(this);
        this.onClickUpKeaper = this.onClickUpKeaper.bind(this);
        this.onClickDownKeaper = this.onClickDownKeaper.bind(this);
        this.onClickStartForwardTraining = this.onClickStartForwardTraining.bind(this);
        this.onClickStartMidlefielderTraining = this.onClickStartMidlefielderTraining.bind(this);
        this.onClickStartDefenderTraining = this.onClickStartDefenderTraining.bind(this);
        this.onClickStartKeaperTraining = this.onClickStartKeaperTraining.bind(this);
    }

    componentDidMount() {
        this.refreshTable();
    }

    onClickStartForwardTraining() {
        this.setState({
            forwardImage: this.state.current_forward.playerImage
        })
        this.setState({
            forwardDisabled: true
        })
        this.setState({
            forwardBoostDisabled: false
        })
        this.state.training.forwardTraining = true
        this.state.current_forward.onTraining = true
        this.state.finances.amount = this.state.finances.amount - this.state.training.boostForward
        FinancesService.updateFinances(this.state.finances.id, this.state.finances)
        TrainingService.updateTraining(this.state.training.id, this.state.training)
        PlayerService.updatePlayer(this.state.current_forward.id, this.state.current_forward)
    }

    onClickStartMidlefielderTraining() {
        this.setState({
            midlefielderImage: this.state.current_midlefielder.playerImage
        })
        this.setState({
            midlefielderDisabled: true
        })
        this.setState({
            midlefielderBoostDisabled: false
        })
        this.state.training.midfielderTraining = true
        this.state.current_midlefielder.onTraining = true
        this.state.finances.amount = this.state.finances.amount - this.state.training.boostMidlefielder
        FinancesService.updateFinances(this.state.finances.id, this.state.finances)
        TrainingService.updateTraining(this.state.training.id, this.state.training)
        PlayerService.updatePlayer(this.state.current_midlefielder.id, this.state.current_midlefielder)
    }

    onClickStartDefenderTraining() {
        this.setState({
            defenderImage: this.state.current_defender.playerImage
        })
        this.setState({
            defenderDisabled: true
        })
        this.setState({
            defenderBoostDisabled: false
        })
        this.state.training.defenderTraining = true
        this.state.current_defender.onTraining = true
        this.state.finances.amount = this.state.finances.amount - this.state.training.boostDefender
        FinancesService.updateFinances(this.state.finances.id, this.state.finances)
        TrainingService.updateTraining(this.state.training.id, this.state.training)
        PlayerService.updatePlayer(this.state.current_defender.id, this.state.current_defender)
    }

    onClickStartKeaperTraining() {
        this.setState({
            keaperImage: this.state.current_keaper.playerImage
        })
        this.setState({
            keaperDisabled: true
        })
        this.setState({
            keaperBoostDisabled: false
        })
        this.state.training.goalkeaperTraining = true
        this.state.current_keaper.onTraining = true
        this.state.finances.amount = this.state.finances.amount - this.state.training.boostGoalkeaper
        FinancesService.updateFinances(this.state.finances.id, this.state.finances)
        TrainingService.updateTraining(this.state.training.id, this.state.training)
        PlayerService.updatePlayer(this.state.current_keaper.id, this.state.current_keaper)
    }


    onClickDownForward() {
        if (this.state.forwardIndex + 1 === this.state.forwards.length) {
            this.setState({
                forwardIndex: 0
            })
        }
        else {
            this.setState({
                forwardIndex: this.state.forwardIndex + 1
            })
        }
    }

    onClickUpForward() {
        if (this.state.forwardIndex - 1 === -1) {
            this.setState({
                forwardIndex: this.state.forwards.length - 1
            })
        }
        else {
            this.setState({
                forwardIndex: this.state.forwardIndex - 1
            })
        }
    }

    onClickDownMidlefielder() {
        if (this.state.midlefielderIndex + 1 === this.state.midlefielders.length) {
            this.setState({
                midlefielderIndex: 0
            })
        }
        else {
            this.setState({
                midlefielderIndex: this.state.midlefielderIndex + 1
            })
        }
    }

    onClickUpMidlefielder() {
        if (this.state.midlefielderIndex - 1 === -1) {
            this.setState({
                midlefielderIndex: this.state.midlefielders.length - 1
            })
        }
        else {
            this.setState({
                midlefielderIndex: this.state.midlefielderIndex - 1
            })
        }
    }

    onClickDownDefender() {
        if (this.state.defenderIndex + 1 === this.state.midlefielders.length) {
            this.setState({
                defenderIndex: 0
            })
        }
        else {
            this.setState({
                defenderIndex: this.state.defenderIndex + 1
            })
        }
    }

    onClickUpDefender() {
        if (this.state.defenderIndex - 1 === -1) {
            this.setState({
                defenderIndex: this.state.midlefielders.length - 1
            })
        }
        else {
            this.setState({
                defenderIndex: this.state.defenderIndex - 1
            })
        }
    }

    onClickDownKeaper() {
        if (this.state.keaperIndex + 1 === this.state.goalkeapers.length) {
            this.setState({
                keaperIndex: 0
            })
        }
        else {
            this.setState({
                keaperIndex: this.state.keaperIndex + 1
            })
        }
    }

    onClickUpKeaper() {
        if (this.state.keaperIndex - 1 === -1) {
            this.setState({
                keaperIndex: this.state.goalkeapers.length - 1
            })
        }
        else {
            this.setState({
                keaperIndex: this.state.keaperIndex - 1
            })
        }
    }

    refreshTable() {
        TeamService.getTeamById(this.state.id)
            .then(
                response => {
                    this.setState({ team: response.data })
                }
            )
        PlayerService.getPlayersBySquadId(this.state.id)
            .then(
                response => {
                    this.setState({ players: response.data })
                }
            )
        TrainingService.getTrainingByTeamId(this.state.id)
            .then(
                response => {
                    this.setState({ training: response.data })
                }
            )
        FinancesService.getFinancesByTeamId(this.state.id)
            .then(
                response => {
                    this.setState({ finances: response.data })
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
                                <div class="body-content-container"></div>
                                <div class="row" id="ro">
                                    {
                                        this.state.players.map(player => {
                                            if (player.position === "forward") {
                                                this.state.forwards.push(player);
                                            }

                                        })
                                    }
                                    {
                                        this.state.players.map(player => {
                                            if (player.position === "middlefielder") {
                                                this.state.midlefielders.push(player);
                                            }
                                        })
                                    }
                                    {
                                        this.state.players.map(player => {
                                            if (player.position === "defender") {
                                                this.state.defenders.push(player);
                                            }
                                        })
                                    }

                                    {
                                        this.state.players.map(player => {
                                            if (player.position === "goalkeaper") {
                                                this.state.goalkeapers.push(player);
                                            }
                                        })
                                    }

                                    {
                                        this.state.forwards.map(player => {
                                            if (player.onTraining === true) {
                                                this.state.forwardImage = player.playerImage
                                                this.state.current_forward = player;
                                                this.state.forwardDisabled = true;
                                                this.state.forwardBoostDisabled = false;
                                            }
                                        })
                                    }
                                    {
                                        this.state.midlefielders.map(player => {
                                            if (player.onTraining === true) {
                                                this.state.midlefielderImage = player.playerImage
                                                this.state.current_midlefielder = player;
                                                this.state.midlefielderDisabled = true;
                                                this.state.midlefielderBoostDisabled = false;
                                            }
                                        })
                                    }
                                    {
                                        this.state.defenders.map(player => {
                                            if (player.onTraining === true) {
                                                this.state.defenderImage = player.playerImage
                                                this.state.current_defender = player;
                                                this.state.defenderDisabled = true;
                                                this.state.defenderBoostDisabled = false;
                                            }
                                        })
                                    }
                                    {
                                        this.state.goalkeapers.map(player => {
                                            if (player.onTraining === true) {
                                                this.state.keaperImage = player.playerImage
                                                this.state.current_keaper = player;
                                                this.state.keaperDisabled = true;
                                                this.state.keaperBoostDisabled = false;
                                            }
                                        })
                                    }
                                    <div class="col-md-2" id="forward-training" >
                                        <div class="row" style={{ align: "center" }}>
                                            <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickUpForward} id="back-button"><i class="fa fa-arrow-up"></i></button>
                                            </div>
                                            <div class="col-md-6" style={{ textAlign: "center", marginTop: 10 }}>
                                                {this.state.forwards.map((player, index) => {
                                                    if (index === this.state.forwardIndex) {
                                                        this.state.current_forward = player
                                                    }
                                                })}
                                                <div> {this.state.current_forward.surname} </div>
                                            </div>
                                            <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickDownForward} id="forward-button"><i class="fa fa-arrow-down"></i></button>
                                            </div>
                                        </div>
                                        <div class="row" style={{ align: "center", height: 150 }}>
                                            <div class="col-md-12" style={{ textAlign: "center", marginTop: 10 }}>
                                                <img src={this.state.forwardImage} />
                                            </div>
                                            <div class="col-md-12" style={{ textAlign: "center", marginTop: 10 }}>
                                            </div>
                                        </div>
                                        <div class="col-md-2" style={{ textAlign: "center", marginTop: 10 }}>
                                            {this.state.current_forward.overall}
                                        </div>
                                        <div class="col-md-8" style={{ textAlign: "center", marginTop: 10 }}>
                                            <ProgressBar variant="success" now={this.state.current_forward.overall} />
                                        </div>
                                        <div class="col-md-2" style={{ textAlign: "left", marginTop: 10 }}>
                                            {this.state.current_forward.overall + 1}
                                        </div>
                                        <button class="btn btn-success" disabled={this.state.forwardDisabled} onClick={this.onClickStartForwardTraining} style={{ marginTop: 200, width: 190, fontSize: 16 }}>Train</button>
                                        <button class="btn btn-success" disabled={this.state.forwardBoostDisabled} style={{ marginTop: 20, width: 190, fontSize: 16 }}>Boost</button>
                                    </div>
                                    <div class="col-md-2" id="midfielder-training" >
                                        <div class="row" style={{ align: "center" }}>
                                            <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickUpMidlefielder} id="back-button"><i class="fa fa-arrow-up"></i></button>
                                            </div>
                                            <div class="col-md-6" style={{ textAlign: "center", marginTop: 10 }}>
                                                {this.state.midlefielders.map((player, index) => {
                                                    if (index === this.state.midlefielderIndex) {
                                                        this.state.current_midlefielder = player
                                                    }
                                                })}
                                                <div> {this.state.current_midlefielder.surname} </div>
                                            </div>
                                            <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickDownMidlefielder} id="forward-button"><i class="fa fa-arrow-down"></i></button>
                                            </div>
                                        </div>
                                        <div class="row" style={{ align: "center", height: 150 }}>
                                            <div class="col-md-12" style={{ textAlign: "center", marginTop: 10 }}>
                                                <img src={this.state.midlefielderImage} />
                                            </div>
                                        </div>
                                        <div class="col-md-2" style={{ textAlign: "center", marginTop: 10 }}>
                                            {this.state.current_midlefielder.overall}
                                        </div>
                                        <div class="col-md-8" style={{ textAlign: "center", marginTop: 10 }}>

                                            <ProgressBar variant="success" now={this.state.current_midlefielder.overall} />
                                        </div>
                                        <div class="col-md-2" style={{ textAlign: "left", marginTop: 10 }}>
                                            {this.state.current_midlefielder.overall + 1}
                                        </div>
                                        <button class="btn btn-success" disabled={this.state.midlefielderDisabled} onClick={this.onClickStartMidlefielderTraining} style={{ marginTop: 200, width: 190, fontSize: 16 }}>Train</button>
                                        <button class="btn btn-success" disabled={this.state.midlefielderBoostDisabled} style={{ marginTop: 20, width: 190, fontSize: 16 }}>Boost</button>

                                    </div>
                                    <div class="col-md-2" id="defender-training" >
                                        <div class="row" style={{ align: "center" }}>
                                            <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickUpDefender} id="back-button"><i class="fa fa-arrow-up"></i></button>
                                            </div>
                                            <div class="col-md-6" style={{ textAlign: "center", marginTop: 10 }}>
                                                {this.state.defenders.map((player, index) => {
                                                    if (index === this.state.defenderIndex) {
                                                        this.state.current_defender = player
                                                    }
                                                })}
                                                <div> {this.state.current_defender.surname} </div>
                                            </div>
                                            <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickDownDefender} id="forward-button"><i class="fa fa-arrow-down"></i></button>
                                            </div>

                                        </div>
                                        <div class="row" style={{ align: "center", height: 150 }}>
                                            <div class="col-md-12" style={{ textAlign: "center", marginTop: 10 }}>
                                                <img src={this.state.defenderImage} />
                                            </div>
                                        </div>
                                        <div class="col-md-2" style={{ textAlign: "center", marginTop: 10 }}>
                                            {this.state.current_defender.overall}
                                        </div>
                                        <div class="col-md-8" style={{ textAlign: "center", marginTop: 10 }}>

                                            <ProgressBar variant="success" now={this.state.current_defender.overall} />
                                        </div>
                                        <div class="col-md-2" style={{ textAlign: "left", marginTop: 10 }}>
                                            {this.state.current_defender.overall + 1}
                                        </div>
                                        <button class="btn btn-success" disabled={this.state.defenderDisabled} onClick={this.onClickStartDefenderTraining} style={{ marginTop: 200, width: 190, fontSize: 16 }}>Train</button>
                                        <button class="btn btn-success" disabled={this.state.defenderBoostDisabled} style={{ marginTop: 20, width: 190, fontSize: 16 }}>Boost</button>

                                    </div>
                                    <div class="col-md-2" id="goalkeaper-training">
                                        <div class="row" style={{ align: "center" }}>
                                            <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickUpKeaper} id="back-button"><i class="fa fa-arrow-up"></i></button>
                                            </div>
                                            <div class="col-md-6" style={{ textAlign: "center", marginTop: 10 }}>
                                                {this.state.goalkeapers.map((player, index) => {
                                                    if (index === this.state.keaperIndex) {
                                                        this.state.current_keaper = player
                                                    }
                                                })}
                                                <div> {this.state.current_keaper.surname} </div>
                                            </div>
                                            <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickDownKeaper} id="forward-button"><i class="fa fa-arrow-down"></i></button>
                                            </div>
                                        </div>
                                        <div class="row" style={{ align: "center", height: 150 }}>
                                            <div class="col-md-12" style={{ textAlign: "center", marginTop: 10 }}>
                                                <img src={this.state.keaperImage} />
                                            </div>
                                        </div>
                                        <div class="col-md-2" style={{ textAlign: "center", marginTop: 10 }}>
                                            {this.state.current_keaper.overall}
                                        </div>
                                        <div class="col-md-8" style={{ textAlign: "center", marginTop: 10 }}>
                                            <ProgressBar variant="success" now={this.state.current_keaper.overall} />
                                        </div>
                                        <div class="col-md-2" style={{ textAlign: "left", marginTop: 10 }}>
                                            {this.state.current_keaper.overall + 1}
                                        </div>
                                        <button class="btn btn-success" disabled={this.state.keaperDisabled} onClick={this.onClickStartKeaperTraining} style={{ marginTop: 200, width: 190, fontSize: 16 }}>Train</button>
                                        <button class="btn btn-success" disabled={this.state.keaperBoostDisabled} style={{ marginTop: 20, width: 190, fontSize: 16 }}>Boost</button>
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
                    <div style={{ fontSize: 20, textAlign: "center"}}>
                        <a href="/">Please, enter into the system</a>
                    </div>
                </div>
            )
        }
    }
}

export default TrainingComponent