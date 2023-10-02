import axios from "axios";

let doGetRequestWithBasicAuth = async (url, email, password) => {
    const authorizationBasic = window.btoa(email + ':' + password);
    const config = {
        "headers": {
            "Authorization": "Basic " + authorizationBasic
        },
        withCredentials: true,
    };
    // URL: http://localhost:8080 is set in package.json proxy
    return await axios.get(url, config);
}

let doGetRequestWithBarerToken = async (url) => {
    const localstorage_token = JSON.parse(localStorage.getItem('token'))
    const config = {
        "headers": {
            "Authorization": "Bearer " + localstorage_token
        },
        withCredentials: true,
    };
    // URL: http://localhost:8080 is set in package.json proxy
    return await axios.get(url, config);
}

const DoHttpRequest = {
    doGetRequestWithBasicAuth,
    doGetRequestWithBarerToken
}

export default DoHttpRequest;

