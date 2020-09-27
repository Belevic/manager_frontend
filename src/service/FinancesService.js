import axios from 'axios'

const ENTITY_URL = 'finances'
const EXTERNAL_ENTITY_URL = 'team'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const FINANCES_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class FinancesService {

    getFinancesByTeamId(id){
        return axios.get(`${FINANCES_REQUEST_URL}/${EXTERNAL_ENTITY_URL}/${id}`)
    }

    updateFinances(id,finances){
        return axios.put(`${FINANCES_REQUEST_URL}/${id}`,finances);
    }
}

export default new FinancesService()