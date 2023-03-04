import $api from "./axiosInit"

export default async function signIn(body){
    return await $api.post('/auth/signin', {
        Headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        login: body.login,
        password: body.password
    })
    .then( response => response.data) //приходит объект с данными и токенами
    .catch( err => {console.log(err)})
}