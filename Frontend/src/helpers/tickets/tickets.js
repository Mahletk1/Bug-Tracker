import axios from "axios";

export function requestGetTickets() {
    return axios.get("http://127.0.0.1:8000/tickets/");
}

export function postTicket(form_data) {
    return axios.post("http://127.0.0.1:8000/tickets/", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}

export function updateTicket(form_data) {
    return axios.put("http://127.0.0.1:8000/tickets/", form_data)
}

export function deleteTicket(id) {
    return axios.delete(`http://127.0.0.1:8000/tickets/?id=${id}`)
}