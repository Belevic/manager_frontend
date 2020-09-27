import axios from 'axios'

const ENTITY_URL = 'player'
const EXTERNAL_ENTITY_URL = 'squad'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const PLAYER_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class PlayerService {

    getPlayersBySquadId(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/${EXTERNAL_ENTITY_URL}/${id}`);
    }

    getAllPlayersOnTransfer(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/transfer`);
    }

    getOverallPace(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/pace/${id}`);
    }

    getOverallPassing(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/passing/${id}`);
    }

    getOverallShooting(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/shooting/${id}`);
    }

    getOverallDribbling(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/dribbling/${id}`);
    }

    getOverallPhysical(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/physical/${id}`);
    }

    updatePlayer(id,player){
        return axios.put(`${PLAYER_REQUEST_URL}/${id}`,player);
    }

    getPlayerById(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/${id}`);
    }

    getOverallDefense(id) {
        return axios.get(`${PLAYER_REQUEST_URL}/defense/${id}`);
    }
}

export default new PlayerService()