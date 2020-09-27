import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Tactics.css';
import TacticsService from "../service/TacticsService";
import TeamService from "../service/TeamService";
import UserService from "../service/UserService";
import FinancesService from "../service/FinancesService";
import { Range } from 'react-range';
import HeaderComponent from './HeaderComponent';
import SubheaderComponent from './SubheaderComponent';

class TacticsComponent extends Component {

    constructor(props) {
        super(props)
        const img0 = 'https://www.wikihow.com/images/thumb/a/a7/Pass-a-Soccer-Ball-Step-5-Version-3.jpg/aid58799-v4-728px-Pass-a-Soccer-Ball-Step-5-Version-3.jpg';
        const img1 = 'https://www.wikihow.com/images/thumb/d/d7/Pass-a-Soccer-Ball-Step-1-Version-3.jpg/aid58799-v4-728px-Pass-a-Soccer-Ball-Step-1-Version-3.jpg';
        const img2 = 'https://sportsaroundtheworldblog.files.wordpress.com/2016/05/aid58799-716px-pass-a-soccer-ball-step-3-version-2.jpg';
        const img3 = 'https://www.wikihow.com/images/9/92/Pass-a-Soccer-Ball-Step-12-Version-2.jpg';
        const img4 = 'https://www.wikihow.com/images/thumb/3/3b/Pass-a-Soccer-Ball-Step-10-Version-2.jpg/aid58799-v4-716px-Pass-a-Soccer-Ball-Step-10-Version-2.jpg';
        const img5 = 'https://www.wikihow.com/images/thumb/6/67/Improve-Soccer-Tackling-Skills-Step-5.jpg/aid10125049-v4-728px-Improve-Soccer-Tackling-Skills-Step-5.jpg';
        const img6 = 'https://www.wikihow.com/images/6/6b/Improve-Soccer-Tackling-Skills-Step-13.jpg';
        const img7 = 'https://www.wikihow.com/images/thumb/1/14/Improve-Soccer-Tackling-Skills-Step-1.jpg/aid10125049-v4-728px-Improve-Soccer-Tackling-Skills-Step-1.jpg';
        const img8 = 'https://www.wikihow.com/images/thumb/a/a6/Play-Soccer-Step-20-Version-7.jpg/aid326038-v4-728px-Play-Soccer-Step-20-Version-7.jpg';
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            id: localStorage.getItem("teamId"),
            user: UserService.getCurrentUser(),
            team: '',
            finances: '',
            isOpen: false,
            pressingValues: [50],
            styleValues: [50],
            tempValues: [50],
            markingIndex: 0,
            markingList: [{ name: "Zone check" }, { name: "Person check" }],
            offsideIndex: 0,
            offsideList: [{ name: "Yes" }, { name: "No" }],
            defenseIndex: 0,
            defenseList: [{ img: img5, name: "careful" }, { img: img6, name: "normal" }, { img: img7, name: "aggresive" }, { img: img8, name: "reckless" }],
            styleIndex: 0,
            imgList: [{ img: img0, name: "Long balls" }, { img: img1, name: "Passing game" }, { img: img2, name: "Counter attack" }, { img: img3, name: "Wind play" }, { img: img4, name: "Shoots on sight" }],
            forwardIndex: 0,
            forwardList: [{ name: "Drop deep" }, { name: "Attack only" }, { name: "Support midfield" }],
            midfieldIndex: 0,
            midfieldList: [{ name: "Push forward" }, { name: "Stay in position" }, { name: "Protect the defense" }],
            defenderIndex: 0,
            defenderList: [{ name: "Deep defend" }, { name: "Attacking full-back" }, { name: "Support midfield" }],
            tactics: '',
            date: date
        }
        this.onClickForwardStyle = this.onClickForwardStyle.bind(this);
        this.onClickBackStyle = this.onClickBackStyle.bind(this);
        this.onClickDefense = this.onClickDefense.bind(this);
        this.onClickBackDefense = this.onClickBackDefense.bind(this);
        this.onClickForwardMarking = this.onClickForwardMarking.bind(this);
        this.onClickBackMarking = this.onClickBackMarking.bind(this);
        this.onClickForwardOffside = this.onClickForwardOffside.bind(this);
        this.onClickBackOffside = this.onClickBackOffside.bind(this)
        this.onClickBackDefender = this.onClickBackDefender.bind(this);
        this.onClickBackForward = this.onClickBackForward.bind(this);
        this.onClickBackMidfield = this.onClickBackMidfield.bind(this);
        this.onClickForward = this.onClickForward.bind(this);
        this.onClickMidfield = this.onClickMidfield.bind(this);
        this.onClickDefender = this.onClickDefender.bind(this);
        this.refreshTactics = this.refreshTactics.bind(this);
    }

    componentDidMount() {
        this.refreshTactics();
    }

    onClickDefense() {
        if (this.state.defenseIndex + 1 === this.state.defenseList.length) {
            this.setState({
                defenseIndex: 0
            })
            this.state.tactics.tackling = this.state.defenseList[this.state.defenseIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                defenseIndex: this.state.defenseIndex + 1
            })
            this.state.tactics.tackling = this.state.defenseList[this.state.defenseIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickBackDefense() {
        if (this.state.defenseIndex - 1 === -1) {
            this.setState({
                defenseIndex: this.state.defenseList.length - 1
            })
            this.state.tactics.tackling = this.state.defenseList[this.state.defenseIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                defenseIndex: this.state.defenseIndex - 1
            })
            this.state.tactics.tackling = this.state.defenseList[this.state.defenseIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickForwardOffside() {
        if (this.state.offsideIndex + 1 === this.state.offsideList.length) {
            this.setState({
                offsideIndex: 0
            })
            this.state.tactics.offsideTrap = this.state.offsideList[this.state.offsideIndex].name;
            TacticsService.updateTactics(2, this.state.tactics)
        }
        else {
            this.setState({
                offsideIndex: this.state.offsideIndex + 1
            })
            this.state.tactics.offsideTrap = this.state.offsideList[this.state.offsideIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickBackOffside() {
        if (this.state.offsideIndex - 1 === -1) {
            this.setState({
                offsideIndex: this.state.offsideList.length - 1
            })
            this.state.tactics.offsideTrap = this.state.offsideList[this.state.offsideIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                offsideIndex: this.state.offsideIndex - 1
            })
            this.state.tactics.offsideTrap = this.state.offsideList[this.state.offsideIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickForwardMarking() {
        if (this.state.markingIndex + 1 === this.state.markingList.length) {
            this.setState({
                markingIndex: 0
            })
            this.state.tactics.custody = this.state.markingList[this.state.markingIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                markingIndex: this.state.markingIndex + 1
            })
            this.state.tactics.custody = this.state.markingList[this.state.markingIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickBackMarking() {
        if (this.state.markingIndex - 1 === -1) {
            this.setState({
                markingIndex: this.state.markingList.length - 1
            })
            this.state.tactics.custody = this.state.markingList[this.state.markingIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                markingIndex: this.state.markingIndex - 1
            })
            this.state.tactics.custody = this.state.markingList[this.state.markingIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickForward() {
        if (this.state.defenseIndex + 1 === this.state.defenseList.length) {
            this.setState({
                defenseIndex: 0
            })
            this.state.tactics.attackingStyle = this.state.forwardList[this.state.forwardIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                defenseIndex: this.state.defenseIndex + 1
            })
            this.state.tactics.attackingStyle = this.state.forwardList[this.state.forwardIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickBackForward() {
        if (this.state.forwardIndex - 1 === -1) {
            this.setState({
                forwardIndex: this.state.forwardList.length - 1
            })
            this.state.tactics.attackingStyle = this.state.forwardList[this.state.forwardIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                forwardIndex: this.state.forwardIndex - 1
            })
            this.state.tactics.attackingStyle = this.state.forwardList[this.state.forwardIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickMidfield() {
        if (this.state.midfieldIndex + 1 === this.state.midfieldList.length) {
            this.setState({
                midfieldIndex: 0
            })
            this.state.tactics.midlefieldingStyle = this.state.midfieldList[this.state.midfieldIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                midfieldIndex: this.state.midfieldIndex + 1
            })
            this.state.tactics.midlefieldingStyle = this.state.midfieldList[this.state.midfieldIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickBackMidfield() {
        if (this.state.midfieldIndex - 1 === -1) {
            this.setState({
                midfieldIndex: this.state.midfieldList.length - 1
            })
            this.state.tactics.midlefieldingStyle = this.state.midfieldList[this.state.midfieldIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                midfieldIndex: this.state.midfieldIndex - 1
            })
            this.state.tactics.midlefieldingStyle = this.state.midfieldList[this.state.midfieldIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickDefender() {
        if (this.state.defenderIndex + 1 === this.state.defenderList.length) {
            this.setState({
                defenderIndex: 0
            })
            this.state.tactics.defenderStyle = this.state.defenderList[this.state.defenseIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                defenderIndex: this.state.defenderIndex + 1
            })
            this.state.tactics.defenderStyle = this.state.defenderList[this.state.defenseIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickBackDefender() {
        if (this.state.defenderIndex - 1 === -1) {
            this.setState({
                defenderIndex: this.state.defenderList.length - 1
            })
            this.state.tactics.defenderStyle = this.state.defenderList[this.state.defenseIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                defenderIndex: this.state.defenderIndex - 1
            })
            this.state.tactics.defenderStyle = this.state.defenderList[this.state.defenseIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickForwardStyle() {
        if (this.state.styleIndex + 1 === this.state.imgList.length) {
            this.setState({
                styleIndex: 0
            })
            this.state.tactics.gameStyle = this.state.imgList[this.state.styleIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
        else {
            this.setState({
                styleIndex: this.state.styleIndex + 1
            })
            this.state.tactics.gameStyle = this.state.imgList[this.state.styleIndex].name;
            TacticsService.updateTactics(this.state.id, this.state.tactics)
        }
    }

    onClickBackStyle() {
        if (this.state.styleIndex - 1 === -1) {
            this.setState({
                styleIndex: this.state.imgList.length - 1
            })
            this.state.tactics.gameStyle = this.state.imgList[this.state.styleIndex].name;
            TacticsService.updateTactics(this.state.tactics.id, this.state.tactics)
        }
        else {
            this.setState({
                styleIndex: this.state.styleIndex - 1
            })
            this.state.tactics.gameStyle = this.state.imgList[this.state.styleIndex].name;
            TacticsService.updateTactics(this.state.tactics.id, this.state.tactics)
        }
    }

    refreshTactics() {
        FinancesService.getFinancesByTeamId(localStorage.getItem("teamId"))
            .then(
                response => {
                    this.setState({ finances: response.data })
                }
            )
        TacticsService.getTacticsByTeamId(this.state.id)
            .then(
                response => {
                    this.setState({ tactics: response.data })
                }
            )
        TeamService.getTeamById(this.state.id)
            .then(
                response => {
                    this.setState({ team: response.data })
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
                                <div class="row" id="ro" >
                                    <div class="col-md-4" id="game-style">
                                        <div class="row">
                                            <div class="col-md-4">

                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                Game style
                                        </div>
                                            <div class="col-md-4">

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12" style={{ textAlign: "center", marginTop: 10 }}>
                                                <img src={this.state.imgList[this.state.styleIndex].img} style={{ align: "center", height: 250, width: 400 }} alt="" /><br />
                                            </div>
                                        </div>
                                        <div class="row" style={{ align: "center" }}>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickBackStyle} id="back-button"><i class="fa fa-arrow-left"></i></button>
                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                {this.state.imgList[this.state.styleIndex].name}
                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickForwardStyle} id="forward-button"><i class="fa fa-arrow-right"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" id="line-tactics">
                                        <div class="row">
                                            <div class="col-md-4">

                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                Line tactics
                                        </div>
                                            <div class="col-md-4">

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12" style={{ textAlign: "center", marginTop: 10 }}>
                                                <div class="row" style={{ align: "center" }}>
                                                    <div class="col-md-12" style={{ textAlign: "center", color: "goldenrod" }}>
                                                        Forwards
                                                    </div>
                                                </div>
                                                <div class="row" style={{ align: "center" }}>
                                                    <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <button class="btn btn-success" onClick={this.onClickBackForward} id="back-button"><i class="fa fa-arrow-left"></i></button>
                                                    </div>
                                                    <div class="col-md-6" style={{ textAlign: "center", marginTop: 10 }}>
                                                        {this.state.forwardList[this.state.forwardIndex].name}
                                                    </div>
                                                    <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <button class="btn btn-success" onClick={this.onClickForward} id="forward-button"><i class="fa fa-arrow-right"></i></button>
                                                    </div>
                                                </div>
                                                <div class="row" style={{ align: "center", marginTop: 50 }}>
                                                    <div class="col-md-12" style={{ textAlign: "center", color: "goldenrod" }}>
                                                        Midlefielders
                                                    </div>
                                                </div>
                                                <div class="row" style={{ align: "center" }}>
                                                    <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <button class="btn btn-success" onClick={this.onClickBackMidfield} id="back-button"><i class="fa fa-arrow-left"></i></button>
                                                    </div>
                                                    <div class="col-md-6" style={{ textAlign: "center", marginTop: 10 }}>
                                                        {this.state.midfieldList[this.state.midfieldIndex].name}
                                                    </div>
                                                    <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <button class="btn btn-success" onClick={this.onClickMidfield} id="forward-button"><i class="fa fa-arrow-right"></i></button>
                                                    </div>
                                                </div>
                                                <div class="row" style={{ align: "center", marginTop: 50 }}>
                                                    <div class="col-md-12" style={{ textAlign: "center", color: "goldenrod" }}>
                                                        Defenders
                                                    </div>
                                                </div>
                                                <div class="row" style={{ align: "center" }}>
                                                    <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <button class="btn btn-success" onClick={this.onClickBackDefender} id="back-button"><i class="fa fa-arrow-left"></i></button>
                                                    </div>
                                                    <div class="col-md-6" style={{ textAlign: "center", marginTop: 10 }}>
                                                        {this.state.defenderList[this.state.defenderIndex].name}
                                                    </div>
                                                    <div class="col-md-3" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <button class="btn btn-success" onClick={this.onClickDefender} id="forward-button"><i class="fa fa-arrow-right"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="line-type">
                                        <div class="row">
                                            <div class="col-md-4">

                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                Line game style
                                        </div>
                                            <div class="col-md-4">

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-7" style={{ textAlign: "center", marginTop: 10 }}>
                                                <div class="row">
                                                    <div class="col-md-1">

                                                    </div>
                                                    <div class="col-md-9" style={{ textAlign: "center", marginTop: 10 }}>
                                                        Defense style
                                                </div>
                                                    <div class="col-md-2">

                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <img src={this.state.defenseList[this.state.defenseIndex].img} style={{ align: "center", height: 200, width: 200 }} alt="" /><br />
                                                    </div>
                                                </div>
                                                <div class="row" style={{ align: "center" }}>
                                                    <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <button class="btn btn-success" onClick={this.onClickBackDefense} id="back-button"><i class="fa fa-arrow-left"></i></button>
                                                    </div>
                                                    <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                        {this.state.defenseList[this.state.defenseIndex].name}
                                                    </div>
                                                    <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                        <button class="btn btn-success" onClick={this.onClickDefense} id="forward-button"><i class="fa fa-arrow-right"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-5" style={{ textAlign: "center", marginTop: 10 }}>
                                                <div class="row">
                                                    <div class="col-md-1">

                                                    </div>
                                                    <div class="col-md-10" style={{ textAlign: "center", marginTop: 10 }}>
                                                        Attacking style
                                                </div>
                                                    <div class="col-md-1">

                                                    </div>
                                                </div>
                                                <div class="row" style={{ marginTop: 10 }}>
                                                    <div class="col-md-1">

                                                    </div>
                                                    <div class="col-md-10" style={{ textAlign: "center", marginTop: 10 }}>
                                                        Pressing
                                                </div>
                                                    <div class="col-md-1">

                                                    </div>
                                                </div>
                                                <Range style={{ marginTop: 10 }}
                                                    step={0.1}
                                                    min={0}
                                                    max={100}
                                                    values={this.state.pressingValues}
                                                    onChange={pressingValues => this.setState({ pressingValues })}
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
                                                                height: '10px',
                                                                width: '10px',
                                                                backgroundColor: 'rgba(3, 16, 31, 0.65)'
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <div class="row" style={{ marginTop: 10 }}>
                                                    <div class="col-md-1">

                                                    </div>
                                                    <div class="col-md-10" style={{ textAlign: "center", marginTop: 10 }}>
                                                        Style
                                                </div>
                                                    <div class="col-md-1">

                                                    </div>
                                                </div>
                                                <Range style={{ marginTop: 10 }}
                                                    step={0.1}
                                                    min={0}
                                                    max={100}
                                                    values={this.state.styleValues}
                                                    onChange={styleValues => this.setState({ styleValues })}
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
                                                                height: '10px',
                                                                width: '10px',
                                                                backgroundColor: 'rgba(3, 16, 31, 0.65)'
                                                            }}
                                                        />
                                                    )}
                                                />

                                                <div class="row" style={{ marginTop: 10 }}>
                                                    <div class="col-md-1">

                                                    </div>
                                                    <div class="col-md-10" style={{ textAlign: "center", marginTop: 10 }}>
                                                        Tempo
                                                </div>
                                                    <div class="col-md-1">

                                                    </div>
                                                </div>
                                                <Range
                                                    step={0.1}
                                                    min={0}
                                                    max={100}
                                                    values={this.state.tempValues}
                                                    onChange={tempValues => this.setState({ tempValues })}
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
                                                                height: '10px',
                                                                width: '10px',
                                                                backgroundColor: 'rgba(3, 16, 31, 0.65)'
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="zonal-game-style">
                                        <div class="row">
                                            <div class="col-md-4">

                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                Marking
                                        </div>
                                            <div class="col-md-4">

                                            </div>
                                        </div>
                                        <div class="row">
                                        </div>
                                        <div class="row" style={{ align: "center", marginTop: 10 }}>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickBackMarking} id="back-button"><i class="fa fa-arrow-left"></i></button>
                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                {this.state.markingList[this.state.markingIndex].name}
                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickForwardMarking} id="forward-button"><i class="fa fa-arrow-right"></i></button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-3">

                                    </div>
                                    <div class="col-md-4" id="offside-trap">
                                        <div class="row">
                                            <div class="col-md-4">

                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                Offside trap
                                        </div>
                                            <div class="col-md-4">

                                            </div>
                                        </div>
                                        <div class="row">

                                        </div>
                                        <div class="row" style={{ align: "center", marginTop: 10 }}>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickBackOffside} id="back-button"><i class="fa fa-arrow-left"></i></button>
                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                {this.state.offsideList[this.state.offsideIndex].name}
                                            </div>
                                            <div class="col-md-4" style={{ textAlign: "center", marginTop: 10 }}>
                                                <button class="btn btn-success" onClick={this.onClickForwardOffside} id="forward-button"><i class="fa fa-arrow-right"></i></button>
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

export default TacticsComponent