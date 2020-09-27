import React, { Component } from 'react'
import '../styles/Squad.css';
import TeamService from "../service/TeamService";
import PlayerService from "../service/PlayerService";
import UserService from "../service/UserService";
import FinancesService from "../service/FinancesService";
import ProgressBar from "../components/ProgressBarComponent";
import Modal from "react-bootstrap/Modal";
import { Range } from 'react-range';
import HeaderComponent from './HeaderComponent';
import SubheaderComponent from './SubheaderComponent';

class SquadComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("teamId"),
            user: UserService.getCurrentUser(),
            finances: '',
            name: '',
            logo_image: '',
            showModal: false,
            squadId: 0,
            values: [50],
            value: 0,
            team: {
                stadium: {
                    name: '',
                    capacity: 0
                }
            },
            players: [],
            forwards: [],
            midlefielders: [],
            defenders: [],
            goalkeapers: [],
            player: {
                id: 0,
                name: 'no name',
                surname: 'no name',
                country: {
                    id: 0,
                    name: 'no name',
                    abbreviation: 'no name',
                    flagImage: 'no name'
                },
                squad: {
                    id: 0
                },
                health: 100,
                price: {
                    maxPrice: 0,
                    minPrice: 0,
                    price: 0
                },
                overall: 0,
                playerImage: 'no name'
            }
        }
        this.refreshSquad = this.refreshSquad.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.dragRange = this.dragRange.bind(this)
        this.addToTransferList = this.addToTransferList.bind(this);
    }

    componentDidMount() {
        this.refreshSquad();
    }

    handleOpenModal(player) {
        this.setState({ showModal: true, forwards: [], midlefielders: [], defenders: [], goalkeapers: [], player: player });
        this.state.players.map(player => {
            if (player.position === "forward") {
                this.state.forwards.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "goalkeaper") {
                this.state.goalkeapers.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "middlefielder") {
                this.state.midlefielders.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "defender") {
                this.state.defenders.push(player);
            }
        })
    }

    dragRange(values) {
        this.setState({ forwards: [], midlefielders: [], defenders: [], goalkeapers: [] });
        this.setState({ values: values });
        this.state.value = this.state.player.price.minPrice + ((this.state.player.price.maxPrice - this.state.player.price.minPrice) * values / 100)
        this.state.players.map(player => {
            if (player.position === "forward") {
                this.state.forwards.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "goalkeaper") {
                this.state.goalkeapers.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "middlefielder") {
                this.state.midlefielders.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "defender") {
                this.state.defenders.push(player);
            }
        })
    }

    addToTransferList() {
        this.state.player.onTransfer = true;
        this.state.player.transferPrice = this.state.value;
        PlayerService.updatePlayer(this.state.player.id, this.state.player)
        window.location.reload(false)
    }

    handleCloseModal() {
        this.setState({ showModal: false, forwards: [], midlefielders: [], defenders: [], goalkeapers: [] });
        this.state.players.map(player => {
            if (player.position === "forward") {
                this.state.forwards.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "goalkeaper") {
                this.state.goalkeapers.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "middlefielder") {
                this.state.midlefielders.push(player);
            }
        })
        this.state.players.map(player => {
            if (player.position === "defender") {
                this.state.defenders.push(player);
            }
        })
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
        PlayerService.getPlayersBySquadId(this.state.id)
            .then(
                response => {
                    this.setState({ players: response.data })
                }
            )
            .catch(error => { console.log(error.response) })
    }

    render() {

        const { showModal } = this.state;
        if (this.state.user.role === "USER") {
            return (
                <body>
                    {
                        this.state.players.map(player => {
                            if (player.position === "forward") {
                                this.state.forwards.push(player);
                            }
                        })}
                    <div id="background" >
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                        <Modal.Header style={{ backgroundColor: ' rgba(1, 41, 82, .65)', color: "white" }}>Setting player transfer price</Modal.Header>
                        <Modal.Body style={{ backgroundColor: 'rgba(3, 16, 31, 0.65)' }}>>
                        <div class="col-md-2"
                            ></div>
                            <div class="col-md-8" id="player-column">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="row" id="overall-column">
                                            {this.state.player.overall}
                                        </div>
                                        <div class="row" id="flag-column">
                                            <img src={this.state.player.country.flagImage} title={this.state.player.country.name} style={{ height: 25, width: 35 }} />
                                        </div>
                                        <div class="row" id="club-column">
                                            <img src={this.state.team.logoImage} title={this.state.team.name} style={{ height: 40, width: 35 }} />
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <img src={this.state.player.playerImage} />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3" id="player-column-name">
                                    </div>
                                    <div class="col-md-9" id="player-full-name">
                                        {this.state.player.name} {this.state.player.surname}
                                    </div>
                                    <div class="col-md-0" id="player-column-name">

                                    </div>
                                </div>

                            </div>

                            <div class="col-md-2"
                            ></div>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: 'rgba(3, 16, 31, 0.65)', border: "none" }}><Range style={{ marginTop: 10 }}
                            step={0.001}
                            min={0}
                            max={100}
                            values={this.state.values}
                            onChange={values => { this.dragRange(values) }}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '6px',
                                        width: '100%',
                                        backgroundColor: 'white',
                                        marginTop: 10
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '20px',
                                        width: '20px',
                                        backgroundColor: 'white'
                                    }}
                                />
                            )}
                        />
                            <div class="col-md-12" style={{ color: "goldenrod", fontSize: 20 }}>{this.state.value / 1000000}M</div></Modal.Footer ><Modal.Footer style={{ backgroundColor: ' rgba(1, 41, 82, .65)' }}>
                            <button id="add-to" onClick={this.addToTransferList}>Add</button>
                            <button id="add-cancel" onClick={this.handleCloseModal}>Cancel</button>
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
                                <div class="body-content-container"> </div>
                                <div class="row" id="ro">
                                    <div class="col-md-3">
                                        <div class="row" id="team-result">

                                            <div class="col-md-4" style={{ marginTop: 15 }}>
                                                <img src={this.state.team.logoImage} />
                                            </div>
                                            <div class="col-md-8">
                                                <div class="row">
                                                    <div class="col-sm-2">
                                                    </div>
                                                    <div class="col-sm-10" id="club-name">
                                                        {this.state.team.name}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2">
                                                    </div>
                                                    <div class="col-sm-10" id="club-manager">
                                                        Position: {this.state.team.aim}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2">
                                                    </div>
                                                    <div class="col-sm-10" id="club-manager">
                                                        Position aim: {this.state.team.aim}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2">
                                                    </div>
                                                    <div class="col-sm-10" id="club-manager">
                                                        Stadium: {this.state.team.stadium.name}
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2">
                                                    </div>
                                                    <div class="col-sm-10" id="club-manager">
                                                        Capacity: {this.state.team.stadium.capacity}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-9" id="squad-table">

                                        <table class="table table-borderless table-striped table-dark" id="forwards-squad">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left" }}>Forwards</th>
                                                    <th>Nat</th>
                                                    <th>Age</th>
                                                    <th>Ranting</th>
                                                    <th>Health</th>
                                                    <th>Morale</th>
                                                    <th>Goals</th>
                                                    <th>Assists</th>
                                                    <th>Yellow cards</th>
                                                    <th>Red cards</th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    this.state.forwards.map(
                                                        player =>
                                                            <tr key={player.id}>
                                                                <td style={{ width: 250, textAlign: "left" }}> <a id="link" href={"player/" + player.id} style={{ color: "white" }}>{player.number}  {player.name} {player.surname}</a></td>
                                                                <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 25, width: 35 }} /></td>
                                                                <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                <td>{player.overall}</td>
                                                                <td><ProgressBar value={player.health} /></td>
                                                                <td><ProgressBar value={player.morale} /></td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td> <button class="btn btn-success btn-primary" onClick={() => this.handleOpenModal(player)} id="add-to-transfer-button"><i class="fa fa-plus"></i></button></td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <table class="table table-borderless table-striped table-dark" id="midfielders-squad">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left" }}>Middlefielders</th>
                                                    <th>Nat</th>
                                                    <th>Age</th>
                                                    <th>Ranting</th>
                                                    <th>Health</th>
                                                    <th>Morale</th>
                                                    <th>Goals</th>
                                                    <th>Assists</th>
                                                    <th>Yellow cards</th>
                                                    <th>Red cards</th>
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
                                                            <tr key={player.id}>
                                                                <td style={{ width: 250, textAlign: "left" }}> <a id="link" href={"player/" + player.id} style={{ color: "white" }}>{player.number}  {player.name} {player.surname}</a></td>
                                                                <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 25, width: 35 }} /></td>
                                                                <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                <td>{player.overall}</td>
                                                                <td><ProgressBar value={player.health} /></td>
                                                                <td><ProgressBar value={player.morale} /></td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td> <button class="btn btn-success btn-primary" onClick={() => this.handleOpenModal(player)} id="add-to-transfer-button"><i class="fa fa-plus"></i></button></td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <table class="table table-borderless table-striped table-dark" id="defenders-squad">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left" }}>Defenders</th>
                                                    <th>Nat</th>
                                                    <th>Age</th>
                                                    <th>Ranting</th>
                                                    <th>Health</th>
                                                    <th>Morale</th>
                                                    <th>Goals</th>
                                                    <th>Assists</th>
                                                    <th>Yellow cards</th>
                                                    <th>Red cards</th>
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
                                                            <tr key={player.id}>
                                                                <td style={{ width: 250, textAlign: "left" }}> <a id="link" href={"player/" + player.id} style={{ color: "white" }}>{player.number}  {player.name} {player.surname}</a></td>
                                                                <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 25, width: 35 }} /></td>
                                                                <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                <td>{player.overall}</td>
                                                                <td><ProgressBar value={player.health} /></td>
                                                                <td><ProgressBar value={player.morale} /></td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td> <button class="btn btn-success btn-primary" onClick={() => this.handleOpenModal(player)} id="add-to-transfer-button"><i class="fa fa-plus"></i></button></td>



                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <table class="table table-borderless table-striped table-dark" id="goalkeapers-squad">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left" }}>Goalkeapers</th>
                                                    <th>Nat</th>
                                                    <th>Age</th>
                                                    <th>Ranting</th>
                                                    <th>Health</th>
                                                    <th>Morale</th>
                                                    <th>Goals</th>
                                                    <th>Assists</th>
                                                    <th>Yellow cards</th>
                                                    <th>Red cards</th>
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
                                                            <tr key={player.id}>
                                                                <td style={{ width: 250, textAlign: "left" }}> <a id="link" href={"player/" + player.id} style={{ color: "white" }}>{player.number}  {player.name} {player.surname}</a></td>
                                                                <td><img src={player.country.flagImage} title={player.country.name} style={{ height: 25, width: 35 }} /></td>
                                                                <td style={{ marginTop: 8 }}>{2020 - player.birthday.slice(0, 1)}</td>
                                                                <td>{player.overall}</td>
                                                                <td><ProgressBar value={player.health} /></td>
                                                                <td><ProgressBar value={player.morale} /></td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td> <button class="btn btn-success btn-primary" onClick={() => this.handleOpenModal(player)} id="add-to-transfer-button"><i class="fa fa-plus"></i></button></td>
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
        else{
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

export default SquadComponent