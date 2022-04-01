import { API_URL, STORAGE_URL } from "variables";

let jodit = undefined;

export default class JoditConfig {
    constructor (path) {
        this.path = path;
        this.jodit = undefined;
    }

    config() {
        return ({
            language: 'pt_br',
            events: {
                afterInit: instance => { this.jodit = instance }
            },
            uploader: {
                url: `${API_URL}${this.path}`,
                filesVariableName: () => "image",
                insertImageAsBase64URI: false,
                withCredentials: false,
                imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
                headers: { "accept": `application/json`,'Authorization': `Bearer ${localStorage.getItem('token')}` },
                method: "POST",
                pathVariableName: 'path',
                prepareData: data => data,
                isSuccess: resp => !resp.error,
                getMessage: e => e,
                process: response => {
                    let files = [];
                    files.unshift(STORAGE_URL + response.image);
                    return {
                        files: files
                    };
                },
                defaultHandlerSuccess: (resp, elem) => {
                    if (resp.files && resp.files.length) {
                        resp.files.forEach((filename, index) => {
                            this.jodit.selection.insertImage(filename, null, 250);
                        });
                    }
                }
            }
        });
    }
}

// const JoditConfig = path => ({
//     language: 'pt_br',
//     events: {
//         afterInit: instance => { jodit = instance }
//     },
//     uploader: {
//         url: `${API_URL}${path}`,
//         filesVariableName: () => "image",
//         insertImageAsBase64URI: false,
//         withCredentials: false,
//         imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
//         headers: { "accept": `application/json`,'Authorization': `Bearer ${localStorage.getItem('token')}` },
//         method: "POST",
//         pathVariableName: 'path',
//         prepareData: data => data,
//         isSuccess: resp => !resp.error,
//         getMessage: e => e,
//         process: response => {
//             let files = [];
//             files.unshift(STORAGE_URL + response.image);
//             return {
//                 files: files
//             };
//         },
//         defaultHandlerSuccess: (resp, elem) => {
//             if (resp.files && resp.files.length) {
//                 resp.files.forEach((filename, index) => {
//                     jodit.selection.insertImage(filename, null, 250);
//                 });
//             }
//         }
//     }
// });
