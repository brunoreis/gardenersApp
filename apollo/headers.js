import base64 from 'base-64';
import utf8 from 'utf8';

let headers = {};
export const setToken = (authToken) => {
    if (authToken) {
        headers = {'Authorization':'Bearer ' + authToken}
    }
    else {
        headers = {}
    }
};

encode = (text) => base64.encode(utf8.encode(text));
export const getHeaders = () => {
    return {
        ...headers,
    };
};
