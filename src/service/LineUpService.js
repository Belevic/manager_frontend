import axios from 'axios'

const ENTITY_URL = 'lineUp'
const EXTERNAL_ENTITY_URL = 'team'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const LINEUP_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class LineUpService {

    getLineUpById(id) {
        return axios.get(`${LINEUP_REQUEST_URL}/${id}`);
    }

    updateLineUp(id,lineUp){
        return axios.put(`${LINEUP_REQUEST_URL}/${id}`,lineUp)
    }

    getLineUpByTeamId(id){
        return axios.get(`${LINEUP_REQUEST_URL}/${EXTERNAL_ENTITY_URL}/${id}`);
    }
}

export default new LineUpService()