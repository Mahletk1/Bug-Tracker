import axios from "axios";

export function requestGetUsers() {
    return axios.get("http://127.0.0.1:8000/users/");
}
export function requestPostUser(form_data) {
    return axios.post("http://127.0.0.1:8000/users/", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function requestPutUser(form_data) {
    return axios.put("http://127.0.0.1:8000/users/", form_data)
}
export function deleteUser(id,uid) {
    return axios.delete(`http://127.0.0.1:8000/users/?id=${id}&uid=${uid}`)
}

export async function urlToObject(image) {
    const response = await fetch(image);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    return file

}