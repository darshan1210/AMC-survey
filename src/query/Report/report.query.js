import axios from '../../axios'


export async function GetReportList(requestParams) {
    return await axios.get(`/survey-report?type=${requestParams?.type}&page=${requestParams?.pageNumber}&per_page=${requestParams?.nLimit}`)
}
