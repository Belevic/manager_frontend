import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent'
import DashboardComponent from './DashboardComponent';
import ChooseClubComponent from './ChooseClubComponent';
import MainTeamComponent from './MainTeamComponent';
import SquadComponent from './SquadComponent';
import PlayerComponent from './PlayerComponent';
import TacticsComponent from './TacticsComponent';
import ResultsComponent from './ResultsComponent';
import TableComponent from './TableComponent';
import TrainingComponent from './TrainingComponent';
import TransferListComponent from './TransferListComponent';
import LineUpComponent from './LineUpComponent';
import AdminComponent from './AdminComponent';

class RoutingComponent extends Component {
    render() {
        return (
            <Router>
                <>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/dashboard" exact component={DashboardComponent} />
                        <Route path="/register" exact component={RegisterComponent} />
                        <Route path="/choose/:id" exact component={ChooseClubComponent} />
                        <Route path="/main" exact component={MainTeamComponent} />
                        <Route path="/squad" exact component={SquadComponent}/>
                        <Route path="/player/:id" exact component={PlayerComponent}/>
                        <Route path="/tactics" exact component={TacticsComponent}/>
                        <Route path="/results" exact component={ResultsComponent}/>
                        <Route path="/table" exact component={TableComponent}/>
                        <Route path="/training" exact component={TrainingComponent}/>
                        <Route path="/transfer" exact component={TransferListComponent}/>
                        <Route path="/line" exact component={LineUpComponent}/>
                        <Route path="/admin" exact component={AdminComponent}/>
                    </Switch>
                </>
            </Router>
        )
    }
}

export default RoutingComponent