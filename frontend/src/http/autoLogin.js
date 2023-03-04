import $api from "./axiosInit";

export default async function refresh() {
    return await $api.get('/auth/refresh')
        .then(result => result)
        .catch(err => {console.log(err)})
}