import {API_URL} from "../config/constants";
import axios from "axios";
import {getAuthAsyncStorage, resetAuthAsyncStorage} from "./storage";
import {useDispatch, useSelector} from "react-redux";
import * as actions_auth from "../actions/auth";
import store from "../reducers";
import {logout} from "../actions/auth";
import {Alert} from "react-native";
import commonHelper from "../Other/commonHelper";

const httpClient = axios.create({
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json'}
});

httpClient.interceptors.request.use(async (config) => {
    console.debug("axios request started ", config.url);
    const auth = await getAuthAsyncStorage();
    config.headers.Authorization = null;
    if (auth.token)
        config.headers.Authorization = `Bearer ${auth.token}`;
    // config.headers.Authorization = `Bearer ${testTokenExpired}`;

    return config;
}, function (error) {
    console.debug("axios request rejected", error);
    return error;
});

httpClient.interceptors.response.use((response) => {
    console.debug(response.request._url, "response enter");
    console.debug(response.request._url + " result", response);
    return response;
}, function (error) {

    const msg = commonHelper.getErrorMessage(error.response);

    switch (error.response.status) {
        case 401: {
            if (error.response.data?.error?.type !== "UnauthorizedAccess") {
                store.dispatch(logout());
            } else {
                if (msg)
                    Alert.alert(msg);
            }
            break;
        }
        case 503:
        case 404: {
            if (msg)
                Alert.alert(msg);
            Alert.alert("Servis ile ilgili hata. Lütfen yöneticiniz ile görüşünüz!");
            break;
        }
        default: {
            if (error.response.data)
                break;
            Alert.alert("Beklenmedik hata oluştu. Lütfen yöneticiniz ile görüşünüz!");
            break;
        }
    }

    console.debug(error.request._url + " rejected", error);

    return error;
});

export default httpClient;
