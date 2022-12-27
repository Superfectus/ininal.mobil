// import {UserType} from "../constants/enums";
import httpClient from "./httpClient";
import commonHelper from "../Other/commonHelper";

function getPendingRequests(page) {
    return new Promise((resolve, reject) => {
        httpClient.get(`payment-request/pending-payment-requests?Page=${page > 0 ? page : 1}&Size=1000`).then((response) => {
            try {
                if (response.data.success) {
                    resolve(response.data);
                } else
                    reject(response);
            } catch (e) {
                reject(e)
            }
        }).catch((err) => {
            commonHelper.catchError(err);
            reject(err)
        });
    });
}

function approveAllPendingRequests() {
    return new Promise((resolve, reject) => {
        httpClient.post(`payment-request/approve-multiple`).then((response) => {
            try {
                if (response.status === 200) {
                    resolve(response.data ? response.data : {success:true});
                } else
                    reject(response);
            } catch (e) {
                reject(e)
            }
        }).catch((err) => {
            commonHelper.catchError(err);
            reject(err)
        });
    });
}

function approveRequest(requestId) {
    return new Promise((resolve, reject) => {
        httpClient.post(`payment-request/approve/${requestId}`).then((response) => {
            try {
                if (response.status === 200) {
                    resolve(response.data);
                } else
                    reject(response);
            } catch (e) {
                reject(e)
            }
        }).catch((err) => {
            commonHelper.catchError(err);
            reject(err)
        });
    });
}

function rejectRequest(requestId, description) {
    return new Promise((resolve, reject) => {
        console.debug(`payment-request/reject/${requestId}`, JSON.stringify({ description: description }));
        httpClient.post(`payment-request/reject/${requestId}`, JSON.stringify({ description: description })).then((response) => {
            try {
                console.debug("payment-request/reject response", response);
                if (response.status === 200) {
                    resolve(response.data ? response.data : {success:true});
                } else
                    reject(response);
            } catch (e) {
                reject(e)
            }
        }).catch((err) => {
            console.debug("payment-request/reject error", err);
            commonHelper.catchError(err);
            reject(err)
        });
    });
}

export const approverService = {
    getPendingRequests,
    approveAllPendingRequests,
    approveRequest,
    rejectRequest,
};
