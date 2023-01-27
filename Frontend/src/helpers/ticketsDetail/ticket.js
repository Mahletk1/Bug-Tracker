import axios from "axios"

export function requestGetTicket(id) {
    return axios.get(`http://127.0.0.1:8000/ticket/${id}`)
}
export function updateTicket(id,form_data) {
    return axios.patch(`http://127.0.0.1:8000/ticket/${id}`,form_data,{
        headers: { "Content-Type": "application/x-www-form-urlencoded" }})
}

export function requestGetComment(id) {
    return axios.get(`http://127.0.0.1:8000/comments/?id=${id}`)
}

export function requestGetAttachments(id) {
    return axios.get(`http://127.0.0.1:8000/attachments/?id=${id}`)
}

export function requestCreateComment(form_data) {
    return axios.post("http://127.0.0.1:8000/comments/", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}

export function deleteComment(id) {
    return axios.delete(`http://127.0.0.1:8000/comments/?id=${id}`)
}
export function requestUploadAttachment(form_data) {
    return axios.post("http://127.0.0.1:8000/attachments/", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}

export async function urlToObject(image) {
    const response = await fetch(image.reader);
    // here image is url/location of image
    const blob = await response.blob();
    console.log(blob)
    const type= blob.type.split('/')
    const fileName=image.name.split('.')
    console.log(blob.type.split('/'),fileName)
    let i = type.length-1
        const file = new File([blob],`${fileName[0]}.${type[1]}` ,{ type: blob.type });
        return file
    }