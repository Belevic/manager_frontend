import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Transfer.css';
import TeamService from "../service/TeamService";
import PlayerService from "../service/PlayerService";
import FinancesService from "../service/FinancesService";
import UserService from "../service/UserService";
import SquadService from "../service/SquadService";
import LineUpService from "../service/LineUpService";
import HeaderComponent from './HeaderComponent';
import SubheaderComponent from './SubheaderComponent';

class TransferListComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("teamId"),
            team: '',
            user: UserService.getCurrentUser(),
            isOpen: false,
            squadId: 0,
            players: [],
            forwards: [],
            midlefielders: [],
            defenders: [],
            goalkeapers: [],
            finances: '',
            squad: '',
            lineUp: ''
        }
        this.refreshSquad = this.refreshSquad.bind(this)
        this.onClickRemoveFromList = this.onClickRemoveFromList.bind(this);
        this.onClickBuyPlayer = this.onClickBuyPlayer.bind(this);
    }

    componentDidMount() {
        this.refreshSquad();
    }

    toggleModal = e => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onClickRemoveFromList(player) {
        player.onTransfer = false;
        PlayerService.updatePlayer(player.id, player)
        window.location.reload(false);
    }

    onClickBuyPlayer(player) {
        player.squad = this.state.squad;
        player.lineUp = this.state.lineUp;
        player.onTransfer = false;
        this.state.finances = this.state.finances - player.price.transferPrice;
        FinancesService.updateFinances(this.state.finances.id, this.state.finances)
        PlayerService.updatePlayer(player.id, player)
        window.location.reload(false);
    }

    refreshSquad() {
        FinancesService.getFinancesByTeamId(localStorage.getItem("teamId"))
            .then(
                response => {
                    this.setState({ finances: response.data })
                }
            )
        TeamService.getTeamById(this.state.id)
            .then(
                response => {
                    this.setState({ team: response.data })
                }
            )
        PlayerService.getAllPlayersOnTransfer()
            .then(
                response => {
                    this.setState({ players: response.data })
                }
            )
        SquadService.getSquadByTeamId(this.state.id)
            .then(
                response => {
                    this.setState({ squad: response.data })
                }
            )
        LineUpService.getLineUpById(this.state.id)
            .then(
                response => {
                    this.setState({ squad: response.data })
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
                                <div class="body-content-container" >
                                    Transfer List
                            </div>
                                <div class="row" id="ro">
                                    <div class="col-md-8" id="transfer-list">

                                        <table class="table table-borderless table-striped table-dark" id="forwards-transfer">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left" }}>Forwards</th>
                                                    <th>Club</th>
                                                    <th>Nat</th>
                                                    <th>Age</th>
                                                    <th>Ranting</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.players.map(player => {
                                                        if (player.position === "forward") {
                                                            this.state.forwards.push(player);
                                                        }
                                                    })
                                                }
                                                {
                                                    this.state.forwards.map(
                                                        player =>
                                                            player.squad.team.id === this.state.id ? (
                                                                <tr key={player.id}>
                                                                    <td style={{ width: 250, textAlign: "left" }}><a href="#" id="player-face"><img src={player.playerImage} style={{ height: 20, width: 20, marginLeft: -10, marginRight: 10 }} /> </a>{player.name} {player.surname}</td>
                                                                    <td>{player.squad.team.name}</td>
                                                                    <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 20, width: 35 }} /></td>
                                                                    <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                    <td>{player.price.transferPrice}</td>
                                                                    <td>
                                                                        <button class="btn btn-success btn-primary" id="contract-button" onClick={() => this.onClickRemoveFromList(player)}><i class="fa fa-pen"></i></button></td>
                                                                </tr>
                                                            )
                                                                : (

                                                                    <tr key={player.id}>
                                                                        <td style={{ width: 250, textAlign: "left" }}><a href="#" id="player-face"><img src={player.playerImage} style={{ height: 20, width: 20, marginLeft: -10, marginRight: 10 }} /> </a>{player.name} {player.surname}</td>
                                                                        <td>{player.squad.team.name}</td>
                                                                        <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 20, width: 35 }} /></td>
                                                                        <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                        <td>{player.overall}</td>
                                                                        <td>{player.price.transferPrice}</td>
                                                                        <td>
                                                                            <button class="btn btn-success btn-primary" onClick={() => this.onClickBuyPlayer(player)} id="contract-button"><i class="fa fa-undo"></i></button></td>
                                                                    </tr>
                                                                )



                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <table class="table table-borderless table-striped table-dark" id="midfielders-transfer">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left" }}>Midfielders</th>
                                                    <th>Club</th>
                                                    <th>Nat</th>
                                                    <th>Age</th>
                                                    <th>Ranting</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.players.map(player => {
                                                        if (player.position === "middlefielder") {
                                                            this.state.midlefielders.push(player);
                                                        }
                                                    })
                                                }
                                                {
                                                    this.state.midlefielders.map(
                                                        player =>
                                                            player.squad.team.id === this.state.id ? (
                                                                <tr key={player.id}>
                                                                    <td style={{ width: 250, textAlign: "left" }}><a href="#" id="player-face"><img src={player.playerImage} style={{ height: 20, width: 20, marginLeft: -10, marginRight: 10 }} /> </a>{player.name} {player.surname}</td>
                                                                    <td>{player.squad.team.name}</td>
                                                                    <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 20, width: 35 }} /></td>
                                                                    <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                    <td>{player.overall}</td>
                                                                    <td>{player.price.transferPrice}</td>
                                                                    <td>
                                                                        <button class="btn btn-success btn-primary" id="contract-button"><i class="fa fa-pen"></i></button></td>
                                                                </tr>
                                                            )
                                                                : (

                                                                    <tr key={player.id}>
                                                                        <td style={{ width: 250, textAlign: "left" }}><a href="#" id="player-face"><img src={player.playerImage} style={{ height: 20, width: 20, marginLeft: -10, marginRight: 10 }} /> </a>{player.name} {player.surname}</td>
                                                                        <td>{player.squad.team.name}</td>
                                                                        <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 20, width: 35 }} /></td>
                                                                        <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                        <td>{player.overall}</td>
                                                                        <td>{player.price.transferPrice}</td>
                                                                        <td>
                                                                            <button class="btn btn-success btn-primary" onClick={() => this.onClickRemoveFromList(player)} id="contract-button"><i class="fa fa-undo"></i></button></td>
                                                                    </tr>
                                                                )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <table class="table table-borderless table-striped table-dark" id="defenders-transfer">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left" }}>Defenders</th>
                                                    <th>Club</th>
                                                    <th>Nat</th>
                                                    <th>Age</th>
                                                    <th>Ranting</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.players.map(player => {
                                                        if (player.position === "defender") {
                                                            this.state.defenders.push(player);
                                                        }
                                                    })
                                                }
                                                {
                                                    this.state.defenders.map(
                                                        player =>
                                                            player.squad.team.id === this.state.id ? (
                                                                <tr key={player.id}>
                                                                    <td style={{ width: 250, textAlign: "left" }}><a href="#" id="player-face"><img src={player.playerImage} style={{ height: 20, width: 20, marginLeft: -10, marginRight: 10 }} /> </a>{player.name} {player.surname}</td>
                                                                    <td>{player.squad.team.name}</td>
                                                                    <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 20, width: 35 }} /></td>
                                                                    <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                    <td>{player.overall}</td>
                                                                    <td>{player.price.transferPrice}</td>
                                                                    <td>
                                                                        <button class="btn btn-success btn-primary" id="contract-button" onClick={() => this.onClickRemoveFromList(player)}><i class="fa fa-undo"></i></button></td>
                                                                </tr>
                                                            )
                                                                : (

                                                                    <tr key={player.id}>
                                                                        <td style={{ width: 250, textAlign: "left" }}><a href="#" id="player-face"><img src={player.playerImage} style={{ height: 20, width: 20, marginLeft: -10, marginRight: 10 }} /> </a>{player.name} {player.surname}</td>
                                                                        <td>{player.squad.team.name}</td>
                                                                        <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 20, width: 35 }} /></td>
                                                                        <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                        <td>{player.overall}</td>
                                                                        <td>{player.price.transferPrice}</td>
                                                                        <td>
                                                                            <button class="btn btn-success btn-primary" id="contract-button" onClick={() => this.onClickBuyPlayer(player)}><i class="fa fa-pen"></i></button></td>
                                                                    </tr>
                                                                )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <table class="table table-borderless table-striped table-dark" id="goalkeapers-transfer">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left" }}>Goalkeapers</th>
                                                    <th>Club</th>
                                                    <th>Nat</th>
                                                    <th>Age</th>
                                                    <th>Ranting</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.players.map(player => {
                                                        if (player.position === "goalkeaper") {
                                                            this.state.goalkeapers.push(player);
                                                        }
                                                    })
                                                }
                                                {
                                                    this.state.goalkeapers.map(
                                                        player =>
                                                            player.squad.team.id === this.state.id ? (
                                                                <tr key={player.id}>
                                                                    <td style={{ width: 250, textAlign: "left" }}><a href="#" id="player-face"><img src={player.playerImage} style={{ height: 20, width: 20, marginLeft: -10, marginRight: 10 }} /> </a>{player.name} {player.surname}</td>
                                                                    <td>{player.squad.team.name}</td>
                                                                    <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 20, width: 35 }} /></td>
                                                                    <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                    <td>{player.overall}</td>
                                                                    <td>{player.price.transferPrice}</td>
                                                                    <td>
                                                                        <button class="btn btn-success btn-primary" id="contract-button"><i class="fa fa-pen"></i></button></td>
                                                                </tr>
                                                            )
                                                                : (

                                                                    <tr key={player.id}>
                                                                        <td style={{ width: 250, textAlign: "left" }}><a href="#" id="player-face"><img src={player.playerImage} style={{ height: 20, width: 20, marginLeft: -10, marginRight: 10 }} /> </a>{player.name} {player.surname}</td>
                                                                        <td>{player.squad.team.name}</td>
                                                                        <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 20, width: 35 }} /></td>
                                                                        <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                        <td>{player.overall}</td>
                                                                        <td>{player.price.transferPrice}</td>
                                                                        <td>
                                                                            <button class="btn btn-success btn-primary" onClick={() => this.onClickRemoveFromList(player)} id="contract-button"><i class="fa fa-undo"></i></button></td>
                                                                    </tr>
                                                                )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-3" id="transfer-search">

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

export default TransferListComponent