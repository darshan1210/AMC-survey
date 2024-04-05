import axios from '../../axios'

export async function addProperty(data) {
    return await axios.post('/property', data)
}
export async function UpdateProperty({ formData, UpdateID }) {
    return await axios.post(`/property/update/${UpdateID}`, formData)
}

export async function GetPropertyList(requestParams, id) {
    return await axios.get(`/property?poi_id=${id}&page=${requestParams?.pageNumber}&per_page=${requestParams?.nLimit}`)
}
