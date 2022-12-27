import {
    USER_WASTE_TYPES_LISTED,
    USER_WASTE_TYPES_ERROR,
    USER_CALC_WASTE,
    USER_CALC_WASTE_ERROR,
    USER_WASTE_REQUEST_COMPLETED,
    READ_PAYMENT_REQUESTS_ERROR,
    READ_PAYMENT_REQUESTS,
    READ_USER_MAIN_INFORMATIONS,
    READ_USER_MAIN_INFORMATIONS_ERROR
} from "../constants/user";
import {userService} from "../services/userService";
import {setLoading, setLoadingComplete} from "./loader";
import {READED_BARCODE} from "../constants/common";
import commonHelper from "../Other/commonHelper";
import store from "../reducers";
import {Alert} from "react-native";

export const getWasteTypesOperationHasSucceeded = (data) => ({
    type: USER_WASTE_TYPES_LISTED,
    payload: data
});
export const errorWhenGetMainInformations = (err) => ({
    type: USER_WASTE_TYPES_ERROR,
    payload: err
});
export const wasteTypesCalculated = (data) => ({
    type: USER_CALC_WASTE,
    payload: data
});
export const wasteTypesRequestCompleted = (state) => ({
    type: USER_WASTE_REQUEST_COMPLETED,
    payload: state
});
export const errorWhenWasteTypesCalculate = (err) => ({
    type: USER_CALC_WASTE_ERROR,
    payload: err
});

const _setBarcode = (barcode) => ({
    type: READED_BARCODE,
    payload: barcode
});


export const paymentRequestList = (data) => ({
    type: READ_PAYMENT_REQUESTS,
    payload: data
});
export const paymentRequestListError = (error) => ({
    type: READ_PAYMENT_REQUESTS_ERROR,
    payload: error
});


export const userMainInformations = (data) => ({
    type: READ_USER_MAIN_INFORMATIONS,
    payload: data
});
export const userMainInformationsError = (data) => ({
    type: READ_USER_MAIN_INFORMATIONS_ERROR,
    payload: data
});


export const getWasteTypes = () => (dispatch) => {
    dispatch(setLoading());
    userService.getWasteTypes().then((res) => {
        const data = res.data.map((d) => {
            d.totalPrice = 0;
            d.amount = 0;
            return d;
        });

        dispatch(getWasteTypesOperationHasSucceeded(data));
    }).catch((err) => {
        console.debug("err", err);
        dispatch(errorWhenGetMainInformations(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(setLoadingComplete());
    });
};

export const setBarcode = (barcode) => (dispatch) => {
    dispatch(_setBarcode(barcode));
}
export const calculateWasteTypes = (wastes) => (dispatch) => {
    dispatch(setLoading());
    userService.calculateWasteTypes(wastes).then((result) => {
        dispatch(wasteTypesCalculated(result));
    }).catch((err) => {
        console.debug("err", err);
        dispatch(errorWhenWasteTypesCalculate(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(setLoadingComplete());
    });
}

export const paymentRequest = (wastes) => (dispatch) => {
    dispatch(setLoading());
    userService.paymentRequest(wastes).then((response) => {
        dispatch(wasteTypesRequestCompleted(response.data.success));

        if (response.data.success) {
            try {
                const home = store.getState().home;
                home.wastest = home.wastes.map((x) => {
                    x.amount = 0;
                    x.totalPrice = 0;
                    return x;
                });
            } catch (e) {
                console.debug("home storage error");
            }
        } else
            dispatch(errorWhenWasteTypesCalculate(commonHelper.getErrorMessage(response)));
    }).catch((err) => {
        console.debug("err", err);
        dispatch(errorWhenWasteTypesCalculate(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(setLoadingComplete());
    });
}

export const getMyRequests = (wastes) => (dispatch) => {
    dispatch(setLoading());
    userService.getMyRequests(wastes).then((response) => {
        console.debug("userService.getMyRequests response", response);
        dispatch(paymentRequestList(response.data));

        if (!response.success) {
            dispatch(paymentRequestListError(commonHelper.getErrorMessage(response)));
        }
    }).catch((err) => {
        console.debug("err", err);
        dispatch(paymentRequestListError(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(setLoadingComplete());
    });
}

export const getFirstUserInformations = () => async (dispatch) => {
    dispatch(setLoading());
        userService.getFirstUserInformations().then((response) => {
            if (response.data.success)
                dispatch(userMainInformations(response.data.data));
            else {
                const errors = commonHelper.getErrorMessage(response);
                dispatch(userMainInformationsError(errors));
                Alert.alert(errors);
            }

        }).catch((err) => {
            console.debug("err", err);
            dispatch(userMainInformationsError(commonHelper.getErrorMessage(err.response)));
        }).finally(() => {
            dispatch(setLoadingComplete());
        });
}


