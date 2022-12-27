import {resetAuthAsyncStorage, setAuthAsyncStorage} from "./storage";
import httpClient from "./httpClient";
import commonHelper from "../Other/commonHelper";


function login(username, password) {
    return new Promise((resolve, reject) => {

        console.debug(`request auth/login`, {
            username: username,
            password: password,
        });

        httpClient.post(`auth/login`, JSON.stringify({
            username: username,
            password: password,
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            try {
                if (response.status === 200) {
                    console.debug("login success")
                    if (response.data.success) {
                        await setAuthAsyncStorage(response.data);
                    }

                    resolve(response.data);
                } else {
                    console.debug("login reject")
                    reject(response);
                }
            } catch (e) {
                console.debug("login catch")
                reject(e);
            }
        }).catch((err, i) => {
            commonHelper.catchError(err);
            reject(err);
        });
    });
}

function sendPasswordCode(username) {
    return new Promise((resolve, reject) => {
        httpClient.post(`auth/remember-password`, JSON.stringify({username})).then((result) => {
            try {
                if (result.status === 200) {
                    console.debug("remember-password success")
                    resolve(result);
                } else {
                    console.debug("remember-password reject")
                    reject(result);
                }
            } catch (e) {
                console.debug("remember-password catch")
                reject(e);
            }
        }).catch((err) => {
            commonHelper.catchError(err);
            reject(err)
        });
    });
}

function resetPassword(data) {
    return new Promise((resolve, reject) => {
            httpClient.post(`auth/reset-password`, JSON.stringify(data))
                .then((result) => {
                    try {
                        if (result.status === 200) {
                            console.debug("resetPassword success")
                            resolve(result);
                        } else {
                            console.debug("resetPassword reject")
                            reject(result);
                        }
                    } catch (e) {
                        console.debug("resetPassword catch")
                        reject(e);
                    }
                }).catch((err) => {
                commonHelper.catchError(err);
                reject(err)
            });
        }
    );
}

function logout() {
    return new Promise((resolve, reject) => {
        resetAuthAsyncStorage();
        resolve();
    });
}

export const authService = {
    login,
    sendPasswordCode,
    resetPassword,
    logout,
};
