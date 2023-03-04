import axios from 'axios'
import refresh from './autoLogin'

export const API_URL = 'http://localhost:3001/api'

const $api = axios.create({
    withCredentials: true, 
    baseURL: API_URL
})

$api.interceptors.request.use((config) => { // Встраиваю токен в запрос на сервер 
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
})

$api.interceptors.response.use((response) => {
    //Если пришёл не токен (а данные) они передаются откуда были вызваны
    // console.log(response)
    if(response.data?.accessToken){
        localStorage.setItem('accessToken', response.data.accessToken)
    }
    return Promise.resolve(response) // возвращается промис (обычный return не thenable) then которого содержит сообщение об успешном обновлении

}, (error) => {
    if(error.response.status === 401){
        return refresh()
    } 
    if(error.response.status === 403) {
        return Promise.reject(error.response)
    } else {
        return Promise.reject(error.response)
    }
})




export default $api