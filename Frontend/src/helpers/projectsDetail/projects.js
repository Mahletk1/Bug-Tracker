import axios from "axios"

export function requestGetProject(id) {
    return axios.get(`http://127.0.0.1:8000/project/${id}`)
}

export function updateProject(id,form_data) {
    return axios.patch(`http://127.0.0.1:8000/project/${id}`,form_data,{
        headers: { "Content-Type": "application/x-www-form-urlencoded" }})
}