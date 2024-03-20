import axios from '../../axios'

export async function AddPOI(data) {
    return await axios.post('/add-poi', data)
}
