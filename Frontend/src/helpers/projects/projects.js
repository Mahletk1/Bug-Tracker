import axios from "axios";

export function requestGetProjects() {
    return axios.get("http://127.0.0.1:8000/projects/");
}
export function postProject(form_data) {
    return axios.post("http://127.0.0.1:8000/projects/", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function updateProject(form_data) {
    return axios.put("http://127.0.0.1:8000/projects/", form_data)
}