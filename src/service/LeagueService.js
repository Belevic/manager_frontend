import axios from 'axios'
import authHeader from '../components/auth-header'

const ENTITY_URL = 'league'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const LEAGUE_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`


class LeagueService {

    getAllLeagues() {
        return axios.get(`${LEAGUE_REQUEST_URL}`,{headers: authHeader()})
    }

    getLeagueById(id){
        return axios.get(`${LEAGUE_REQUEST_URL}/${id}`);
    }
}

export default new LeagueService()