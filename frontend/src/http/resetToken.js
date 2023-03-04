import $api from "./axiosInit";

export default async function exitUser(){ 
    console.log('reset')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('role')
    $api.get('/auth/reset')
        .then(response => response)
        .catch(err => console.log(err))
    
}