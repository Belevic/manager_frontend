import axios from 'axios'

const ENTITY_URL = 'fixture'
const EXTERNAL_ENTIRY_URL = 'team'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const FIXTURE_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class FixtureService {

    getFixtureById(id){
        return axios.get(`${FIXTURE_REQUEST_URL}/${id}`);
    }

    playMatches(id){
        axios.get(`${FIXTURE_REQUEST_URL}/play/${id}`)
    }

    generateFixtureShedule(id){
        axios.get(`${FIXTURE_REQUEST_URL}/shedule/${id}`)
    }
}

export default new FixtureService()