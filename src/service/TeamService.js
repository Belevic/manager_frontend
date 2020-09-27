import axios from 'axios'
import authHeader from '../components/auth-header';

const ENTITY_URL = 'team'
const EXTERNAL_ENTITY_URL = 'league'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const TEAM_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class TeamService {

    getAllLeagueTeams(id) {
        return axios.get(`${TEAM_REQUEST_URL}/${EXTERNAL_ENTITY_URL}/${id}`,{headers : authHeader()});
    }

    getTeamById(id){
        return axios.get(`${TEAM_REQUEST_URL}/${id}`);
    }

    getTeamByManagerId(id){
        return axios.get(`${TEAM_REQUEST_URL}/manager/${id}`);
    }

    getSortedLeagueTeams(id){
        return axios.get(`${TEAM_REQUEST_URL}/sort/${id}`)
    }

    updateTeam(id,team){
        return axios.put(`${TEAM_REQUEST_URL}/${id}`,team)
    }
}

export default new TeamService()