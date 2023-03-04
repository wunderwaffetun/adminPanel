import $api from "./axiosInit";

export default async function addUser(data){
    console.log(data)
    return await $api.post(`/db/add`, {
        data: data
    })
    .then( response => {
        if (response.data?.accessToken) {
            return addUser(data)
        } else {
            return response.data
        }
    } )
    .catch(err => err)
}