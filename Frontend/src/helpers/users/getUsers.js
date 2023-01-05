import axios from "axios";

export function requestGetUsers() {
    return axios.get("http://127.0.0.1:8000/users/");
}
export function requestPostUser(form_data) {
    console.log(form_data)
    return axios.post("http://127.0.0.1:8000/users/", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}