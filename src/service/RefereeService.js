import axios from 'axios'

const ENTITY_URL = 'referee'
const EXTERNAL_ENTIRY_URL = 'team'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const REFEREE_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class RefereeService {

    getRefereeByMatchId(id){
        return axios.get(`${REFEREE_REQUEST_URL}/${id}`);
    }
}

export default new RefereeService()