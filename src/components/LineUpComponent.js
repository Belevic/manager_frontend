import React, { Component } from 'react'
import '../styles/Player.css';
import TeamService from "../service/TeamService";
import LineUpService from "../service/LineUpService";
import PlayerService from "../service/PlayerService";
import UserService from "../service/UserService";
import FinancesService from "../service/FinancesService";
import DroppableToSquad from './DroppableToSquad';
import Droppable from './Droppable';
import Draggable from './Draggable';
import styled from 'styled-components'
import HeaderComponent from './HeaderComponent';
import SubheaderComponent from './SubheaderComponent';
import FormationComponent from './FormationComponent';

const Wrapper = styled.div`
width:170px;
height:100px;
padding: 6px;
display:flex;
justify-content:center;
`;

const Wrapper1 = styled.div`
width:500px;
height:120px;
padding: 32px;
display:flex;
`;

const Item = styled.div`
color:red;
text-align: center;
padding: 8px;
background-color: white;
border-radius: 3px;
`;

const ForwardItem = styled.div`
color:white;
border: black 2px solid;
text-align: center;
padding: 8px;
background-color: rgba(3, 16, 31, 0.65);
border-radius: 3px;
`;

const KeaperItem = styled.div`
color:white;
border: black 2px solid;
text-align: center;
padding: 8px;
background-color: rgba(3, 16, 31, 0.65);
border-radius: 3px;
`;

const DefenderItem = styled.div`
color:white;
border: black 2px solid;
text-align: center;
padding: 8px;
background-color: rgba(3, 16, 31, 0.65);
border-radius: 3px;
`;

const MiddleItem = styled.div`
color:white;
border: black 2px solid;
text-align: center;
padding: 8px;
background-color: rgba(3, 16, 31, 0.65);
border-radius: 3px;
`;

const droppableStyle = {
    backgroundColor: 'rgba(3, 16, 31, 0.65)',
    width: '60px',
    heigth: '60px'
}

class LineUpComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("teamId"),
            user: UserService.getCurrentUser(),
            team: '',
            finances: '',
            lineUp: {
                id: 0,
                schema: '4-3-3',
                team: ''
            },
            isOpen: false,
            squadId: 0,
            players: [],
            forwards: [],
            midlefielders: [],
            defenders: [],
            goalkeapers: []
        }
        this.refreshLineUp = this.refreshLineUp.bind(this)
    }

    componentDidMount() {
        this.refreshLineUp();
    }

    toggleModal = e => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    refreshLineUp() {
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
        LineUpService.getLineUpByTeamId(this.state.id)
            .then(
                response => {
                    this.setState({ lineUp: response.data })
                }
            )
    }

    render() {
        if (this.state.user.role === "USER") {
            this.state.players.map(player => {
                if (player.position === "forward") {
                    this.state.forwards.push(player);
                }
            });
            this.state.players.map(player => {
                if (player.position === "middlefielder") {
                    this.state.midlefielders.push(player);
                }
            });

            this.state.players.map(player => {
                if (player.position === "defender") {
                    this.state.defenders.push(player);
                }
            });


            this.state.players.map(player => {
                if (player.position === "goalkeaper") {
                    this.state.goalkeapers.push(player);
                }
            });
            if (this.state.lineUp.schema === "4-4-2") {
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
                                    <FormationComponent />
                                    <div class="row">

                                        <div class="col-md-7" style={{ marginTop: -10 }}>
                                            <div class="row" id="field" >
                                                <div class="col-md-2">

                                                    <Wrapper style={{ marginTop: 182 }}>
                                                        <Droppable id="dr1" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>

                                                </div>
                                                <div class="col-md-2">
                                                    <Wrapper style={{ marginTop: 40 }}>
                                                        <Droppable id="dr1" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper>
                                                        <Droppable id="dr12" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper>
                                                        <Droppable id="dr19" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper>
                                                        <Droppable id="dr113" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                </div>
                                                <div class="col-md-2">
                                                    <Wrapper style={{ marginTop: 141 }}>
                                                        <Droppable id="dr12222" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>

                                                    <Wrapper>
                                                        <Droppable id="dr13333" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                </div>
                                                <div class="col-md-2">
                                                    <Wrapper style={{ marginTop: 40 }}>
                                                        <Droppable id="dr10302032" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper style={{ marginTop: 196 }}>
                                                        <Droppable id="dr0111" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                </div>
                                                <div class="col-md-2">
                                                    <Wrapper style={{ marginTop: 141 }}>
                                                        <Droppable id="dr54" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper>
                                                        <Droppable id="dr15" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-5">

                                            <Wrapper1 style={{ marginTop: -10 }}>
                                                {
                                                    this.state.forwards.map(
                                                        player =>
                                                            <DroppableToSquad id="dr1" style={droppableStyle}>
                                                                <Draggable id={player.id}><div style={{ textAlign: "center", fontSize: 20 }}>{player.overall}</div>
                                                                    <ForwardItem><img src={player.playerImage} style={{ width: 40, height: 40 }} /></ForwardItem><div style={{ fontSize: 10, textAlign: "center" }}>{player.surname}</div></Draggable>
                                                            </DroppableToSquad>
                                                    )}
                                            </Wrapper1>
                                            <Wrapper1>
                                                {
                                                    this.state.midlefielders.map(
                                                        player =>
                                                            <DroppableToSquad id="dr2" style={droppableStyle}>
                                                                <Draggable id={player.id}><div style={{ textAlign: "center", fontSize: 20 }}>{player.overall}</div>
                                                                    <MiddleItem><img src={player.playerImage} style={{ width: 40, height: 40 }} /></MiddleItem><div style={{ fontSize: 10, textAlign: "center" }}>{player.surname}</div></Draggable>
                                                            </DroppableToSquad>
                                                    )}
                                            </Wrapper1>
                                            <Wrapper1>
                                                {
                                                    this.state.defenders.map(
                                                        player =>
                                                            <DroppableToSquad id="dr3" style={droppableStyle}>
                                                                <Draggable id={player.id}><div style={{ textAlign: "center", fontSize: 20 }}>{player.overall}</div>
                                                                    <DefenderItem><img src={player.playerImage} style={{ width: 40, height: 40 }} /></DefenderItem><div style={{ fontSize: 10, textAlign: "center" }}>{player.surname}</div>
                                                                </Draggable>
                                                            </DroppableToSquad>
                                                    )}
                                            </Wrapper1>
                                            <Wrapper1>
                                                {
                                                    this.state.goalkeapers.map(
                                                        player =>
                                                            <DroppableToSquad id="dr4" style={droppableStyle}>
                                                                <Draggable id={player.id}><div style={{ textAlign: "center", fontSize: 20 }}>{player.overall}</div>
                                                                    <KeaperItem><img src={player.playerImage} style={{ width: 40, height: 40 }} /></KeaperItem><div style={{ fontSize: 10, textAlign: "center" }}>{player.surname}</div></Draggable>
                                                            </DroppableToSquad>
                                                    )}
                                            </Wrapper1>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>
                );
            }
            else if (this.state.lineUp.schema === "4-3-3") {
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
                                    <FormationComponent />
                                    <div class="row">

                                        <div class="col-md-7">
                                            <div class="row" id="field" >
                                                <div class="col-md-3">

                                                    <Wrapper style={{ marginTop: 182 }}>
                                                        <Droppable id="dr1" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>

                                                </div>
                                                <div class="col-md-3">
                                                    <Wrapper style={{ marginTop: 40 }}>
                                                        <Droppable id="dr1" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper>
                                                        <Droppable id="dr12" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper>
                                                        <Droppable id="dr19" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper>
                                                        <Droppable id="dr113" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                </div>
                                                <div class="col-md-3">
                                                    <Wrapper style={{ marginTop: 40 }}>
                                                        <Droppable id="dr0111" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper style={{ marginTop: 45 }}>
                                                        <Droppable id="dr54" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper style={{ marginTop: 45 }}>
                                                        <Droppable id="dr15" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                </div>

                                                <div class="col-md-3">
                                                    <Wrapper style={{ marginTop: 40 }}>
                                                        <Droppable id="dr0111" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper style={{ marginTop: 45 }}>
                                                        <Droppable id="dr54" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                    <Wrapper style={{ marginTop: 45 }}>
                                                        <Droppable id="dr15" style={droppableStyle}>
                                                        </Droppable>
                                                    </Wrapper>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-5">
                                            <Wrapper1 style={{ marginTop: -10 }}>
                                                {
                                                    this.state.forwards.map(
                                                        player =>
                                                            <DroppableToSquad id="dr1" style={droppableStyle}>
                                                                <Draggable id={player.id}><div style={{ textAlign: "center", fontSize: 20 }}>{player.overall}</div>
                                                                    <ForwardItem><img src={player.playerImage} style={{ width: 40, height: 40 }} /></ForwardItem><div style={{ fontSize: 10, textAlign: "center" }}>{player.surname}</div></Draggable>
                                                            </DroppableToSquad>
                                                    )}
                                            </Wrapper1>
                                            <Wrapper1>
                                                {
                                                    this.state.midlefielders.map(
                                                        player =>
                                                            <DroppableToSquad id="dr2" style={droppableStyle}>
                                                                <Draggable id={player.id}><div style={{ textAlign: "center", fontSize: 20 }}>{player.overall}</div>
                                                                    <MiddleItem><img src={player.playerImage} style={{ width: 40, height: 40 }} /></MiddleItem><div style={{ fontSize: 10, textAlign: "center" }}>{player.surname}</div></Draggable>
                                                            </DroppableToSquad>
                                                    )}
                                            </Wrapper1>
                                            <Wrapper1>
                                                {
                                                    this.state.defenders.map(
                                                        player =>
                                                            <DroppableToSquad id="dr3" style={droppableStyle}>
                                                                <Draggable id={player.id}><div style={{ textAlign: "center", fontSize: 20 }}>{player.overall}</div>
                                                                    <DefenderItem><img src={player.playerImage} style={{ width: 40, height: 40 }} /></DefenderItem><div style={{ fontSize: 10, textAlign: "center" }}>{player.surname}</div>
                                                                </Draggable>
                                                            </DroppableToSquad>
                                                    )}
                                            </Wrapper1>
                                            <Wrapper1>
                                                {
                                                    this.state.goalkeapers.map(
                                                        player =>
                                                            <DroppableToSquad id="dr4" style={droppableStyle}>
                                                                <Draggable id={player.id}><div style={{ textAlign: "center", fontSize: 20 }}>{player.overall}</div>
                                                                    <KeaperItem><img src={player.playerImage} style={{ width: 40, height: 40 }} /></KeaperItem><div style={{ fontSize: 10, textAlign: "center" }}>{player.surname}</div></Draggable>
                                                            </DroppableToSquad>
                                                    )}
                                            </Wrapper1>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>
                );
            }

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
export default LineUpComponent