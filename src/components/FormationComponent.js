import React, { Component } from 'react'
import '../styles/Dashboard.css';
import LineUpService from "../service/LineUpService";
import TeamService from "../service/TeamService";

class FormationComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("teamId"),
            team: '',
            lineUp: {
                id: localStorage.getItem("teamId"),
                schema:'4-3-3',
                team: ''
            }
        }
        this.refreshFormation = this.refreshFormation.bind(this)
        this.changeClicked = this.changeClicked.bind(this)
    }

    componentDidMount() {
        this.refreshFormation();
    }

    changeClicked(schema){
        this.state.lineUp.schema = schema;
        this.state.lineUp.team = this.state.team;
        LineUpService.updateLineUp(this.state.lineUp.id,this.state.lineUp)
        window.location.reload(false);
    }

    refreshFormation() {
        LineUpService.getLineUpByTeamId(this.state.id)
        .then(
            response => {
                this.setState({ lineUp: response.data })
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

        return (
            <nav class="navbar navbar-expand-lg navbar-dark primary-color" style={{height:15}}>
                
                <div class="collapse navbar-collapse" id="basicExampleNav">
                    <div class="dropdown" style={{backgroundColor: "rgba(3, 16, 31, 0.65)"}}>
                        Choose formation
                        <div class="dropdown-content">
                            <a href="#" onClick={() => {this.changeClicked("4-2-4")}}>4-2-4</a>
                            <a href="#" onClick={() => {this.changeClicked("3-4-3")}}>3-4-3</a>
                            <a href="#" onClick={() => {this.changeClicked("4-4-2")}}>4-4-2</a>
                            <a href="#" onClick={() => {this.changeClicked("4-3-3")}}>4-3-3</a>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default FormationComponent