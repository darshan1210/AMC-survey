import axios from '../../axios'

export async function AddPOI(data) {
    return await axios.post('/add-poi', data)
}

export async function GetPOIList(requestParams, id) {
    return await axios.get(`/poi?block_id=${id}&page=${requestParams?.pageNumber}&per_page=${requestParams?.nLimit}`)
}
