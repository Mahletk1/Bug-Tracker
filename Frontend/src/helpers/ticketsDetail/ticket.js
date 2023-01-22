import axios from "axios"

export function requestGetTicket(id) {
    return axios.get(`http://127.0.0.1:8000/ticket/${id}`)
}
export function updateTicket(id,form_data) {
    return axios.put(`http://127.0.0.1:8000/ticket/${id}`,form_data)
}