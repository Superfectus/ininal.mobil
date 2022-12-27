import {
    READ_APPROVER_REQUESTS_GETTING,
    READ_APPROVER_REQUESTS_COMPLETED,
    READ_APPROVER_REQUESTS_ERROR, COMPLETE_OPERATION, COMPLETE_OPERATION_ERROR
} from "../constants/approver";
import {setLoading, setLoadingComplete} from "./loader";
import commonHelper from "../Other/commonHelper";
import {approverService} from "../services/approverService";

const gettingWaitingRequests  = (state) => ({
    type: READ_APPROVER_REQUESTS_GETTING,
    payload: state
});
const errorWhenGetWaitingRequests  = (err) => ({
    type: READ_APPROVER_REQUESTS_ERROR,
    payload: err
});
const completeWaitingRequestsGetting  = (data) => ({
    type: READ_APPROVER_REQUESTS_COMPLETED,
    payload: data
});
const completed  = (data) => ({
    type: COMPLETE_OPERATION,
    payload: data
});
const errorWhenCompleted  = (data) => ({
    type: COMPLETE_OPERATION_ERROR,
    payload: data
});

export const approveAllPendingRequest = () => (dispatch) => {
    dispatch(setLoading());
    dispatch(gettingWaitingRequests(true));
    approverService.approveAllPendingRequests().then((response) => {
        dispatch(completed(response.success));
        if (!response.success)
            dispatch(errorWhenGetWaitingRequests(commonHelper.getErrorMessage(response)));
    }).catch((err) => {
        dispatch(errorWhenGetWaitingRequests(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(gettingWaitingRequests(false));
        dispatch(setLoadingComplete());
    });
}
export const approveRequest = (requestId) => (dispatch) => {
    dispatch(setLoading());
    dispatch(gettingWaitingRequests(true));
    approverService.approveRequest(requestId).then((response) => {
        dispatch(completed(response.success));
        if (!response.success)
            dispatch(errorWhenGetWaitingRequests(commonHelper.getErrorMessage(response)));
    }).catch((err) => {
        dispatch(errorWhenGetWaitingRequests(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(gettingWaitingRequests(false));
        dispatch(setLoadingComplete());
    });
}
export const rejectRequest = (requestId, description) => (dispatch) => {
    dispatch(setLoading());
    dispatch(gettingWaitingRequests(true));
    approverService.rejectRequest(requestId, description).then((response) => {
        dispatch(completed(response.success));
        if (!response.success) 
            dispatch(errorWhenGetWaitingRequests(commonHelper.getErrorMessage(response)));
    }).catch((err) => {
        dispatch(errorWhenGetWaitingRequests(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(gettingWaitingRequests(false));
        dispatch(setLoadingComplete());
    });
}

export const getPendingApproveRequests = (page) => (dispatch) => {
    dispatch(setLoading());
    dispatch(gettingWaitingRequests(true));
    approverService.getPendingRequests(page > 0 ? page : 1).then((response) => {
        if (response.success) {
            dispatch(completeWaitingRequestsGetting(response.data));
        }
        else{
            dispatch(errorWhenGetWaitingRequests(commonHelper.getErrorMessage(response)));
        }
    }).catch((err) => {
        dispatch(errorWhenGetWaitingRequests(commonHelper.getErrorMessage(err.response)));
    }).finally(() => {
        dispatch(gettingWaitingRequests(false));
        dispatch(setLoadingComplete());
    });
}



