import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT, AUTH_PWD_RESET, AUTH_PWD_RESET_CODE,
} from '../constants/auth';

const INITIAL_STATE = {
  token: null,
  loggingIn: false,
  loggingOut: false,
  errorMessageLogin: null,
  errorMessageLogout: null,
  pwdSendCode: {
    username:null,
    result: false
  },
  pwdResetResult: {
    result: false
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGOUT: {
      return {
        ...INITIAL_STATE,
      };
    }

    case AUTH_LOGGING_IN: {
      return {
        ...state,
        errorMessageLogin: action.payload ? null : state.errorMessageLogin,
        errorMessageLogout: null,
        loggingIn: action.payload,
      };
    }

    case AUTH_LOGGING_OUT: {
      return {
        ...state,
        errorMessageLogout: action.payload ? null : state.errorMessageLogout,
        loggingOut: action.payload,
      };
    }

    case AUTH_LOGGED_IN: {
      let {user, token} = action.payload;
      return {
        ...state,
        user,
        token,
        errorMessageLogin: null,
        loggingIn: false,
      };
    }

    case AUTH_ERR_LOG_IN: {
      return {
        ...state,
        loggingIn: false,
        errorMessageLogin: action.payload,
      };
    }

    case AUTH_ERR_LOG_OUT: {
      return {
        ...state,
        loggingOut: false,
        errorMessageLogout: action.payload,
      };
    }

    case AUTH_PWD_RESET_CODE: {
      console.debug("AUTH_PWD_RESET_CODE payload ", action.payload);
      return {
        ...state,
        pwdSendCode: action.payload
      };
    }

    case AUTH_PWD_RESET: {
      console.debug("AUTH_PWD_RESET payload ", action.payload);
      return {
        ...state,
        pwdResetResult: action.payload
      };
    }

    default:
      return state;
  }
}
