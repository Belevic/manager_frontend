import axios from 'axios'

const ENTITY_URL = 'squad'
const EXTERNAL_ENTITY_URL = 'team'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const SQUAD_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class SquadService {

    getSquadByTeamId(id){
        return axios.get(`${SQUAD_REQUEST_URL}/${EXTERNAL_ENTITY_URL}/${id}`);
    }
}

export default new SquadService()