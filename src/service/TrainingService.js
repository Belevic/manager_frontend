
import axios from 'axios'

const ENTITY_URL = 'training'
const EXTERNAL_ENTITY_URL = 'team'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const TRAINING_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class TrainingService {

    getTrainingByTeamId(id) {
        alert(id)
        return axios.get(`${TRAINING_REQUEST_URL}/${EXTERNAL_ENTITY_URL}/${id}`);
    }

    updateTraining(id,training){
        return axios.put(`${TRAINING_REQUEST_URL}/${id}`,training);
    }
}

export default new TrainingService()