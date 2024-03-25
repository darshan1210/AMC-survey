import axios from '../../axios'


export async function GetZoneList() {
    return await axios.get(`/zone`)
}

export async function GetWardList(zone_id) {
    return await axios.get(`/ward/${zone_id}`)
}
