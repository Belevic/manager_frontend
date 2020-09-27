import axios from 'axios'

const ENTITY_URL = 'match'
const EXTERNAL_ENTITY_URL = 'team'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const MATCH_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class MatchService {

    getMatchByHomeOrGuestTeamId(id,fixtureId){
        return axios.get(`${MATCH_REQUEST_URL}/${EXTERNAL_ENTITY_URL}/${id}/${fixtureId}`);
    }

    getAllMatches(){
        return axios.get(`${MATCH_REQUEST_URL}`);
    }

    getGroupByFixtureMatches(){
        return axios.get(`${MATCH_REQUEST_URL}/group`)
    }

    generateMatchShedule(id){
        axios.get(`${MATCH_REQUEST_URL}/shedule/${id}`)
    }

    getMatchById(id){
        axios.get(`${MATCH_REQUEST_URL}/${id}`)
    }

    getMatchStatistics(id){
        return axios.get(`${MATCH_REQUEST_URL}/stats/${id}`)
    }

    getMatchStatisticsByFixtureId(id){
        return axios.get(`${MATCH_REQUEST_URL}/stats/all/${id}`)
    }
}

export default new MatchService()