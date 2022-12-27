import {
  LOADING,
  CHECK_NETWORK
} from '../constants/common';
import {AUTH_LOGGING_IN} from "../constants/auth";

const INITIAL_STATE = {
  isLoading: false,
  checkNetwork: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }

    case CHECK_NETWORK: {
      return {
        ...state,
        checkNetwork: action.payload,
      };
    }

    default:
      return state;
  }
}
