import axios from '../../axios'

export async function AddPOI(data) {
    return await axios.post('/add-poi', data)
}

export async function GetPOIList(requestParams) {
    console.log('requestParams', requestParams)
    return await axios.get(`/poi?page=${requestParams?.pageNumber}&per_page=${requestParams?.nLimit}`)
}
