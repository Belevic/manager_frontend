import axios from 'axios'

const ENTITY_URL = 'user'
const TOMCAT_URL = 'http://localhost:8080/manager/'
const USER_REQUEST_URL = `${TOMCAT_URL}/${ENTITY_URL}`

class UserService {

    register(user) {
        return axios.post(`${USER_REQUEST_URL}/register`, user)
    }

    login(user) {
        return axios.post(`${USEcd..c
        dcdcdcdcdcdcdcdcdcdcdcdcdcdcdR_REQUEST_URL}/login`, user)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"))
    }

    getUserById(id){
        return axios.get(`${USER_REQUEST_URL}/${id}`)
    }
}

export default new UserService()