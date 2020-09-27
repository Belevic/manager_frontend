import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Player.css';
import TeamService from "../service/TeamService";
import PlayerService from "../service/PlayerService";
import ProgressBar from "./ProgressBarComponent";
import HeaderComponent from './HeaderComponent';
import SubheaderComponent from './SubheaderComponent';
import UserService from '../service/UserService';

class PlayerComponent extends Component {

    constructor(props) {
        super(props)
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            id: this.props.match.params.id,
            user: UserService.getCurrentUser(),
            isOpen: false,
            name: '',
            logo_image: '',
            player: '',
            country: '',
            defense: '',
            passing: '',
            shooting: '',
            physical: '',
            pace: '',
            dribbling: '',
            date: date
        }
        this.refreshPlayer = this.refreshPlayer.bind(this)
    }

    componentDidMount() {
        this.refreshPlayer();
    }

    toggleModal = e => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    refreshPlayer() {
        PlayerService.getPlayerById(this.state.id)
            .then(
                response => {
                    this.setState({ player: response.data })
                    this.setState({ country: response.data.country })
                }
            )
        PlayerService.getOverallPace(this.state.id)
            .then(
                response => {
                    this.setState({ pace: response.data })
                }
            )
        PlayerService.getOverallDribbling(this.state.id)
            .then(
                response => {
                    this.setState({ dribbling: response.data })
                }
            )
        PlayerService.getOverallDefense(this.state.id)
            .then(
                response => {
                    this.setState({ defense: response.data })
                }
            )

        PlayerService.getOverallShooting(this.state.id)
            .then(
                response => {
                    this.setState({ shooting: response.data })
                }
            )
        PlayerService.getOverallPassing(this.state.id)
            .then(
                response => {
                    this.setState({ passing: response.data })
                }
            )

        PlayerService.getOverallPhysical(this.state.id)
            .then(
                response => {
                    this.setState({ physical: response.data })
                }
            )
        TeamService.getTeamById(1)
            .then(
                response => {
                    this.setState({ logo_image: response.data.logoImage })
                    this.setState({ name: response.data.name })
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
                                <div class="row" id="ro">
                                    <div class="col-md-2" id="player-column">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="row" id="overall-column">
                                                    {this.state.player.overall}
                                                </div>
                                                <div class="row" id="flag-column">
                                                    <img src={this.state.country.flagImage} title={this.state.country.name} style={{ height: 25, width: 35 }} />
                                                </div>
                                                <div class="row" id="club-column">
                                                    <img src={this.state.logo_image} title={this.state.name} style={{ height: 40, width: 35 }} />
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <img src={this.state.player.playerImage} />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-1" id="player-column-name">
                                            </div>
                                            <div class="col-md-10" id="player-full-name">
                                                {this.state.player.name} {this.state.player.surname}
                                            </div>
                                            <div class="col-md-0" id="player-column-name">

                                            </div>
                                        </div>
                                        <div class="row" style={{ marginTop: 3 }}>
                                            <div class="col-sm-6" id="player-values-left-top">
                                                {Math.round((this.state.pace.acceleration + this.state.pace.sprintSpeed) / 2)} PAC
                                                </div>
                                            <div class="col-sm-6" id="player-values-top" >
                                                {Math.round((this.state.dribbling.agility + this.state.dribbling.balance + this.state.dribbling.reactions +
                                                    this.state.dribbling.ballControlling + this.state.dribbling.dribbling + this.state.dribbling.composure +
                                                    this.state.dribbling.paceDribbling) / 7)} DRI
                                                </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6" id="player-values-left">
                                                {Math.round((this.state.shooting.positioning + this.state.shooting.finishing
                                                    + this.state.shooting.shotPower + this.state.shooting.longShots + this.state.shooting.volleys
                                                    + this.state.shooting.penalties) / 6)} SHO
                                                </div>
                                            <div class="col-sm-6" id="player-values" >
                                                {Math.round((this.state.defense.interceptions + this.state.defense.heading + this.state.defense.slideTackle +
                                                    this.state.defense.standingTackle) / 4)} DEF
                                                </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6" id="player-values-left">
                                                {Math.round((this.state.passing.vision + this.state.passing.croosing
                                                    + this.state.passing.freeKick + this.state.passing.shortPassing + this.state.passing.longPassing
                                                    + this.state.passing.curve) / 6)} PAS
                                                </div>
                                            <div class="col-sm-6" id="player-values" >
                                                {Math.round((this.state.physical.jumping + this.state.physical.stamina + this.state.physical.strength +
                                                    this.state.physical.aggression) / 4)} PHY
                                                </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-1" id="manager-column-name">
                                            </div>
                                            <div class="col-md-8" id="manager-full-name">
                                                {this.state.player.position}
                                            </div>
                                            <div class="col-md-1" id="manager-column-name">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-9" id="skills-overview">
                                        <div class="col-md-2">
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8">
                                                    PACE
                                                </div>
                                                <div class="col-md-4">
                                                    {Math.round((this.state.pace.acceleration + this.state.pace.sprintSpeed) / 2)}
                                                </div>
                                            </div>
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Acceleration
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.pace.acceleration}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.pace.acceleration} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Sprin speed
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.pace.sprintSpeed}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.pace.sprintSpeed} />
                                        </div>
                                        <div class="col-md-2">
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8">
                                                    SHOOTING
                                                </div>
                                                <div class="col-md-4">
                                                    {Math.round((this.state.shooting.positioning + this.state.shooting.finishing
                                                        + this.state.shooting.shotPower + this.state.shooting.longShots + this.state.shooting.volleys
                                                        + this.state.shooting.penalties) / 6)}
                                                </div>
                                            </div>
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Positioning
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.shooting.positioning}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.shooting.positioning} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Fininshing
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.shooting.finishing}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.shooting.finishing} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Shot power
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.shooting.shotPower}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.shooting.shotPower} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Long shots
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.shooting.longShots}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.shooting.longShots} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Volleys
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.shooting.volleys}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.shooting.volleys} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Penalties
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.shooting.penalties}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.shooting.penalties} />

                                        </div>
                                        <div class="col-md-2">
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8">
                                                    PASSING
                                                </div>
                                                <div class="col-md-4" >
                                                    {Math.round((this.state.passing.vision + this.state.passing.croosing
                                                        + this.state.passing.freeKick + this.state.passing.shortPassing + this.state.passing.longPassing
                                                        + this.state.passing.curve) / 6)}
                                                </div>
                                            </div>
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Vision
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.passing.vision}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.passing.vision} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Croosing
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.passing.croosing}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.passing.croosing} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Free kick
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.passing.freeKick}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.passing.freeKick} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Short pass
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.passing.shortPassing}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.passing.shortPassing} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Long pass
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.passing.longPassing}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.passing.longPassing} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Curve
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.passing.curve}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.passing.curve} />

                                        </div>
                                        <div class="col-md-2">
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8">
                                                    DRIBBLING
                                                </div>
                                                <div class="col-md-4">
                                                    {
                                                        Math.round((this.state.dribbling.agility + this.state.dribbling.balance + this.state.dribbling.reactions +
                                                            this.state.dribbling.ballControlling + this.state.dribbling.dribbling + this.state.dribbling.composure +
                                                            this.state.dribbling.paceDribbling) / 7)}
                                                </div>
                                            </div>
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Agility
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.dribbling.agility}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.dribbling.agility} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Balance
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.dribbling.balance}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.dribbling.balance} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Reactions
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.dribbling.reactions}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.dribbling.reactions} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Ball control
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.dribbling.ballControlling}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.dribbling.ballControlling} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Dribbling
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.dribbling.dribbling}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.dribbling.dribbling} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Composure
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.dribbling.composure}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.dribbling.composure} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    P. dribbling
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.dribbling.paceDribbling}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.dribbling.paceDribbling} />


                                        </div>
                                        <div class="col-md-2">
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8">
                                                    DEFENSE
                                                </div>
                                                <div class="col-md-4">
                                                    {Math.round((this.state.defense.interceptions + this.state.defense.heading + this.state.defense.slideTackle +
                                                        this.state.defense.standingTackle) / 4)}
                                                </div>
                                            </div>
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Interceptions
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.defense.interceptions}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.defense.interceptions} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Heading
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.defense.heading}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.defense.heading} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Slide tackle
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.defense.slideTackle}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.defense.slideTackle} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Stand tackle
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.defense.standingTackle}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.defense.standingTackle} />

                                        </div>
                                        <div class="col-md-2">
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8">
                                                    PHYSICAL
                                                </div>
                                                <div class="col-md-4">
                                                    {Math.round((this.state.physical.jumping + this.state.physical.stamina + this.state.physical.strength +
                                                        this.state.physical.aggression) / 4)}
                                                </div>
                                            </div>
                                            <div class="row" style={{ marginTop: 10 }}>
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Jumping
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.physical.jumping}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.physical.jumping} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Stamina
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.physical.stamina}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.physical.stamina} />
                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Strength
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.physical.strength}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.physical.strength} />

                                            <div class="row">
                                                <div class="col-md-8" style={{ fontSize: 12 }}>
                                                    Aggression
                                                </div>
                                                <div class="col-md-4">
                                                    {this.state.physical.aggression}
                                                </div>
                                            </div>

                                            <ProgressBar value={this.state.physical.aggression} />
                                        </div>
                                    </div>
                                </div >
                                <div class="row">
                                </div>
                            </div >
                        </div >
                    </div >
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

export default PlayerComponent