// import {UserType} from "../constants/enums";
import httpClient from "./httpClient";
import commonHelper from "../Other/commonHelper";

function getWasteTypes() {
    return new Promise((resolve, reject) => {
        console.debug("getWasteTypes enter")
        httpClient.get(`waste-type?Page=1&Size=20`).then((response) => {
            try {
                if (response.data.success) {
                    console.debug("getWasteTypes success")
                    resolve(response.data);
                } else
                    reject(response);
            } catch (e) {
                debugger;
                console.debug("getWasteTypes error", e);
                reject(e)
            }
        }).catch((err) => {
            commonHelper.catchError(err);
            reject(err)
        });
    });
}

function getMyRequests() {
    return new Promise((resolve, reject) => {
        console.debug("getMyRequests enter")
        httpClient.get(`payment-request?Page=1&Size=20`).then((response) => {
            try {
                if (response.data.success) {
                    console.debug("getMyRequests success")
                    resolve(response.data);
                } else
                    reject(response);
            } catch (e) {
                debugger;
                console.debug("getMyRequests error", e);
                reject(e)
            }
        }).catch((err) => {
            commonHelper.catchError(err);
            reject(err)
        });
    });
}

function calculateWasteTypes(wastes) {
    return new Promise((resolve, reject) => {
        console.debug("payment-request/calculate enter")
        const data = {
            contents: wastes.filter((waste) => waste.amount > 0).map((waste) => {
                return {
                    "typeId": waste.id,
                    "typeName": waste.title,
                    "amount": waste.amount,
                    "unitPrice": 0,
                    "totalPrice": 0
                };
            })
        };
        httpClient.post(`payment-request/calculate`, JSON.stringify(data)).then((response) => {
            try {
                if (response.status === 200) {
                    console.debug("payment-request/calculate success")
                    resolve(response.data);
                } else
                    reject(response);
            } catch (e) {
                console.debug("payment-request/calculate error", e);
                reject(e)
            }
        }).catch((err) => {
            commonHelper.catchError(err);
            reject(err)
        });
    });
}
function paymentRequest(data) {
    return new Promise((resolve, reject) => {
        console.debug("payment-request", data)
        
        httpClient.post(`payment-request`, JSON.stringify(data)).then((result) => {
            try {
                if (result.status === 200) {
                    console.debug("payment-request success")
                    resolve(result);
                } else {
                    console.debug("payment-request reject")
                    reject(result);
                }
            } catch (e) {
                console.debug("payment-request catch")
                reject(e);
            }
        }).catch((err) => {
            commonHelper.catchError(err);
            reject(err)
        });
    });
}
function getFirstUserInformations() {
    return new Promise(async (resolve, reject) => {
        const result = await httpClient.get(`account/me`);
        console.debug("result", result);
        try {
            if (result.status === 200) {
                resolve(result);
            } else {
                reject(result);
            }
        } catch (e) {
            reject(e);
        }
    });
}

export const userService = {
    getWasteTypes,
    getMyRequests,
    calculateWasteTypes,
    paymentRequest,
    getFirstUserInformations
};