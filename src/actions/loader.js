import {
  CHECK_NETWORK,
  LOADING,
} from "../constants/common";

const loading = (state) => ({
  type: LOADING,
  payload: state
});
const networkChecking = (state) => ({
  type: CHECK_NETWORK,
  payload: state
});
export const setLoading = () => (dispatch) => {
  dispatch(loading(true));
};
export const setLoadingComplete = () => (dispatch) => {
  dispatch(loading(false));
};
export const setCheckNetwork = (state) => (dispatch) => {
  dispatch(networkChecking(state));
};