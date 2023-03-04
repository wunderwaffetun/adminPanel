import $api from "./axiosInit";

export default async function changeUser(data){
    return await $api.put(`/db/change/${data.login}`, {
        data: data
    })
    .then( response => {
        if (response.data?.accessToken) {
            return changeUser(data)
        } else {
            return response.data
        }
    } )
    .catch(err => console.log(err))
}