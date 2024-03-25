import axios from '../../axios'


export async function GetMyBlockList(requestParams) {
    return await axios.get(`/my-blocks?page=${requestParams?.pageNumber}&per_page=${requestParams?.nLimit}&filter_text=${requestParams?.search}&zone_id=${requestParams?.zone_id}&ward_id=${requestParams?.ward_id}&start_date=${requestParams?.startDate}&end_date=${requestParams?.endDate}`)
}
