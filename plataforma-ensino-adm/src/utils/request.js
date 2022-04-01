import { API_URL } from "../variables";
import axios from "axios";

export const Post = async (path, body, headers = {}) => {
    let token = localStorage.getItem("token");
    if(token !== null) headers['Authorization'] = 'Bearer '+ token;

    headers = {
        "Accept": "application/json",
        ...headers
    }

    let response = await fetch(API_URL + path, {
        method: "POST",
        body: body,
        headers: headers
    })
    .then(async res => {
        res = await res.json()
        // console.log(res);
        return res;
    })
    .then(json => (json))
    .catch(err => console.error("Error to post: " + err.message));

    return response;
}

export const PostProgress = async (path, body, headers = {}, onProgress = () => {}) => {
    let token = localStorage.getItem("token");
    if(token !== null) headers['Authorization'] = 'Bearer '+ token;

    headers = {
        "Accept": "application/json",
        ...headers
    }

    let response = await axios.post(API_URL + path, body, {
        headers: headers,
        onUploadProgress: e => {
            onProgress((e.loaded / e.total) * 100);
        }
    })
    .then(async res => {
        res = res.data
        return res;
    })
    .then(json => (json))
    .catch(err => console.error("Error to post: " + err.message));

    return response;
}

export const Get = async (path, headers = {}) => {
    let token = localStorage.getItem("token");
    if(token !== null) headers['Authorization'] = 'Bearer ' + token;

    headers = {
        "Accept": "application/json",
        ...headers
    }

    let response = await fetch(API_URL + path, {
        method: "GET",
        headers: headers
    })
    .then(res => res.json())
    .then(json => (json))
    .catch(err => console.log("Error to get: " + err.message));

    return response;
}

export const GetProgress = async (path, headers = {}, onProgress = () => {}) => {
    let token = localStorage.getItem("token");
    if(token !== null) headers['Authorization'] = 'Bearer ' + token;

    headers = {
        "Accept": "application/json",
        ...headers
    }

    let response = await axios.get(API_URL + path, {
        headers: headers,
        onDownloadProgress: e => {
            console.log(e.total);
            // onProgress((e.loaded / e.total) * 100);
        }
    })
    .then(async res => res.data)
    .catch(err => console.log("Error to get: " + err.message));

    return response;
}