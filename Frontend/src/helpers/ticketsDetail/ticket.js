import axios from "axios"

export function requestGetTicket(id) {
    return axios.get(`http://127.0.0.1:8000/ticket/${id}`)
}
export function updateTicket(id,form_data) {
    return axios.put(`http://127.0.0.1:8000/ticket/${id}`,form_data)
}

export function requestGetComment(id) {
    return axios.get(`http://127.0.0.1:8000/comments/?id=${id}`)
}

export function requestCreateComment(form_data) {
    return axios.post("http://127.0.0.1:8000/comments/", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function requestUploadAttachment(form_data) {
    return axios.post("http://127.0.0.1:8000/attachments/", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}