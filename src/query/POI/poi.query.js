import axios from '../../axios'

export async function AddPOI(data) {
    return await axios.post('/add-poi', data);
}

export async function ChangePOIStatus(data) {
    return await axios.post('/change-poi-status', data);
}

export async function GetPOIList(requestParams, id) {
    return await axios.get(`/poi?block_id=${id}&page=${requestParams?.pageNumber}&per_page=${requestParams?.nLimit}&status=${requestParams?.eStatus}`)
}

export async function SubmitAllPOI(data) {
    return await axios.post('/change-block-status', data);
}
