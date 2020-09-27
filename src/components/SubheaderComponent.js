import React, { Component } from 'react'
import '../styles/Dashboard.css';
import TeamService from "../service/TeamService";
import UserService from "../service/UserService";
import FinancesService from "../service/FinancesService";

class SubheaderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("teamId"),
            user: UserService.getCurrentUser(),
            finances: ''
        }
        this.refreshSubheader = this.refreshSubheader.bind(this)
    }

    componentDidMount() {
        this.refreshSubheader();
    }

    refreshSubheader() {
        FinancesService.getFinancesByTeamId(localStorage.getItem("teamId"))
        .then(
            response => {
                this.setState({ finances: response.data })
            }
        )
    }

    render() {

        return (
            <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="basicExampleNav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/main">
                                <i class="fa fa-home" style={{ marginRight: 3 }}></i>Home
                             <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/training">
                                <i class="fa fa-futbol" style={{ marginRight: 3 }}></i>Training
                    </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/results">
                                <i class="fa fa-calendar" style={{ marginRight: 3 }}></i>Shedule
                    </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="fa fa-user-md" style={{ marginRight: 3 }}></i>Stuff
                    </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/transfer" >
                                <i class="fa fa-exchange-alt" style={{ marginRight: 3 }}></i>Transfers
                    </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-tshirt" style={{ marginRight: 3 }}></i>Team
                            </a>
                            <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="/squad">Squad</a>
                                <a class="dropdown-item" href="/line">Line up</a>
                                <a class="dropdown-item" href="/tactics">Tactics</a>
                            </div>
                        </li>
                    </ul>
                    <div class="md-form my-0">
                        <i class="fa fa-coins" aria-hidden="true" style={{ marginRight: 3 }}></i>{this.state.finances.amount / 1000000}M
                </div>
                </div>
            </nav>
        )
    }
}

export default SubheaderComponent