import {
    AUTH_ERR_LOG_IN,
    AUTH_ERR_LOG_OUT,
    AUTH_LOGGED_IN,
    AUTH_LOGGING_IN,
    AUTH_LOGGING_OUT,
    AUTH_LOGOUT, AUTH_PWD_RESET,
    AUTH_PWD_RESET_CODE
} from "../constants/auth";
import {navigate} from "../services/navRef";
import {authService} from "../services";
import commonHelper from "../Other/commonHelper";
import {Alert} from "react-native";
import {setLoading, setLoadingComplete} from "./loader";
import * as navigation from "../services/navRef";
import store from "../reducers";

export const loggingIn = (loggingIn) => ({
    type: AUTH_LOGGING_IN,
    payload: loggingIn
});
export const loggedIn = (data) => ({
    type: AUTH_LOGGED_IN,
    payload: data,
});
export const errorLogIn = (errorMessage) => ({
    type: AUTH_ERR_LOG_IN,
    payload: errorMessage,
});
export const pwd_sendCode = (result) => ({
    type: AUTH_PWD_RESET_CODE,
    payload: result
});
export const pwd_reset = (pwdReset) => ({
    type: AUTH_PWD_RESET,
    payload: pwdReset
});
export const loggedOut = () => ({
    type: AUTH_LOGOUT,
    payload: null
});
export const loggingOut = (lOut) => ({
    type: AUTH_LOGGING_OUT,
    payload: lOut,
});
export const errorLogOut = (errorMessage) => ({
    type: AUTH_ERR_LOG_OUT,
    payload: errorMessage,
});

export const login = (username, password) => (dispatch) => {
    console.debug("login enter", {username, password});
    dispatch(loggingIn(true));
    dispatch(setLoading());
    authService.login(username, password).then((res) => {
        dispatch(loggedIn(res.data));
        navigate('Home');
    }).catch((err) => {
        console.debug("login err", err);
        dispatch(errorLogIn(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(loggingIn(false));
        dispatch(setLoadingComplete());
    });
};

export const sendPasswordCode = (username) => async (dispatch) => {
    dispatch(setLoading());
    dispatch(pwd_sendCode({
        username,
        result: false
    }));
    authService.sendPasswordCode(username)
        .then((response) => {
            dispatch(pwd_sendCode({
                username,
                result: true
            }));

            console.debug("sendPasswordCode navigate NewPasswordEnter");
        }).catch((err) => {
        dispatch(pwd_sendCode({
            username,
            result: false
        }));
        console.debug("sendPasswordCode err", err);
        Alert.alert(err.response.data.message ? err.response.data.message : commonHelper.getErrorMessage(err.response));
    }).finally(() => {
        dispatch(setLoadingComplete());
    });
};

export const resetPassword = (data) => async (dispatch) => {
    dispatch(setLoading());

    dispatch(pwd_reset({
        result: false
    }));

    data.username = store.getState().auth.pwdSendCode.username;

    authService.resetPassword(data)
        .then((response) => {
            dispatch(pwd_reset({
                result: true
            }));
        }).catch((error) => {

        dispatch(pwd_reset({
            result: false
        }));

        console.debug("sendPasswordCode err", error);
        Alert.alert(error.response.data.message ? error.response.data.message : commonHelper.getErrorMessage(error.response));
    }).finally(() => {
        dispatch(setLoadingComplete());
    });
};


export const logout = () => async (dispatch, getState) => {
    console.debug("loggingOut");
    dispatch(loggingOut(true));
    authService.logout(getState).then(async (res) => {
        console.debug("loggedOut");
        store.getState().home.mainInformations = null;
        dispatch(loggedOut());
    }).catch((err) => {
        console.debug("errorLogOut", err);
        dispatch(errorLogOut('Error logging out.'));
    }).finally(() => {
        dispatch(loggingOut(false));
    });
};
