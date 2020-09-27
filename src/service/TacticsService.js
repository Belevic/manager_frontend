import axios from 'axios'

const ENTITY_URL = 'tactics'
const EXTERNAL_ENTITY_URL = 'team'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const TACTICS_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class TacticsService {

    getTacticsByTeamId(id){
        return axios.get(`${TACTICS_REQUEST_URL}/${EXTERNAL_ENTITY_URL}/${id}`);
    }

    updateTactics(id,tactics){
        return axios.put(`${TACTICS_REQUEST_URL}/${id}`,tactics);
    }
}

export default new TacticsService()