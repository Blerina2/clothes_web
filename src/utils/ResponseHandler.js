import httpStatusCode from "http-status-codes";
import {toast} from "react-toastify";

let handlerResponse = (response) => {
    console.log(`Response status code: ${response.status}`)
    if (response.status === httpStatusCode.UNAUTHORIZED || response.status === httpStatusCode.FORBIDDEN) {
        gotoPage("/signin");
    } else if (response.status === httpStatusCode.INTERNAL_SERVER_ERROR) {
        gotoPage("/signin");
    } else if (response.status === httpStatusCode.GATEWAY_TIMEOUT) {
        gotoPage("/signin");
    } else if (response.status === httpStatusCode.OK) {
        return response.json();
    } else {
        toast.warn(`Backend response: ${response.data} and mess`);
        gotoPage("/signup");
    }
}

let handlerError = (error) => {
    console.log(`Response error: ${error}`)
    let errorData = error.response.data;
    if (typeof errorData === 'object') {
        if (errorData.success) {
            toast.success(errorData.message);
        } else {
            toast.warn(errorData.message);
        }
    } else {
        console.error('Backend service unavailable');
        toast.error('Backend service unavailable');
    }
    gotoPage("/signin");
}

function gotoPage(toPage) {
    if (typeof window !== "undefined") {
        setTimeout(() => {
            window.location.href = toPage
        }, 1000);
    }
}

const ResponseHandler = {
    handlerResponse,
    handlerError,
    gotoPage
}

export default ResponseHandler;

