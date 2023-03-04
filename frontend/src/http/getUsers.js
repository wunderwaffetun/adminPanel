import $api from "./axiosInit"

export default async function getUsers(){
    return await $api.get('/dashboard/get-users')
        //Сначала ответ перехватывается в axiosInit интерцептором на response, если токен протух он автоматически
        //обновляется (запросом в самом интерцепторе, но т.к. интер ничего не знает о функции, то нужно перезапустить её уже здесь)
        //после всего этого приходят данные
        .then( response => {
            if (response.data?.accessToken) {
                return getUsers()
            } else {
                return response.data
            }
        } )
        .catch(err => console.log(err))
}