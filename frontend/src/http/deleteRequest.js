import $api from "./axiosInit";

export default async function deleteRequest(id) {
    return await $api.delete(`/db/delete/${id}`)
        .then(response => {
            if (response.data?.accessToken) {
                return deleteRequest(id)
            } else {
                return response.data
            }
        })
        .catch(err => {
            if(err.status === 403) {
                console.log(err.data.message)
            }
        })
}