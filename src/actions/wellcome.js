import {
  CLOSED_WELLCOME,
  OPENED_WELLCOME
} from "../constants/common";
import {setWellcomeShowed} from "../services/storage"

export const wellcomeClosed = () => ({
  type: CLOSED_WELLCOME,
  payload: false
});
export const wellcomeOpened = () => ({
  type: OPENED_WELLCOME,
  payload: true
});

export const wellcomeClose = () => (dispatch) => {
  setWellcomeShowed();
  dispatch(wellcomeClosed());
};

export const wellcomeOpen = () => (dispatch) => {
  dispatch(wellcomeOpened());
};