import {
  CLOSED_WELLCOME,
  OPENED_WELLCOME, READED_BARCODE,
} from '../constants/common';

import {
  USER_ATIKLAR_LISTELENIYOR,
  USER_WASTE_TYPES_LISTED,
  USER_WASTE_TYPES_ERROR,
  USER_CALC_WASTE,
  USER_CALC_WASTE_ERROR,
  USER_WASTE_REQUEST_COMPLETED,
  READ_PAYMENT_REQUESTS,
  READ_PAYMENT_REQUESTS_ERROR, READ_USER_MAIN_INFORMATIONS,
} from "../constants/user";

const INITIAL_STATE = {
  showWellcome: true,
  wastes: [],
  wasteCalculateResult: {},
  errorWasteCalculate: null,
  errorsGettingMainInformations: null,
  barcode: null,
  wasteRequestState: false,
  paymentRequests : [],
  paymentRequestsError : null,
  mainInformationRequestsError: null,
  mainInformations: {
    email: "",
    phone: "",
    municipalityId: "",
    type: "",
    extendedData: {
      additionalProp1: "",
      additionalProp2: "",
      additionalProp3: ""
    },
    jobDescription: "",
    limits: [
      {
        type: "",
        totalLimit: 0,
        remainingLimit: 0
      }
    ],
    id: "",
    firstname: "",
    lastname: ""
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPENED_WELLCOME: {
      return {
        ...INITIAL_STATE,
      };
    }
    case USER_WASTE_TYPES_LISTED: {
      return {
        ...state,
        errorsGettingMainInformations: null,
        wastes: action.payload
      };
    }
    case USER_WASTE_TYPES_ERROR: {
      return {
        ...state,
        errorsGettingMainInformations: action.payload,
      };
    }
    case USER_WASTE_REQUEST_COMPLETED: {
      return {
        ...state,
        paymentRequests: [],
        wasteRequestState: action.payload,
        errorsGettingMainInformations: null
      };
    }
    case USER_CALC_WASTE_ERROR: {
      return {
        ...state,
        errorWasteCalculate: null,
        wasteCalculateResult: false,
        errorsGettingMainInformations: action.payload,
      }
    }
    case USER_CALC_WASTE: {
      return {
        ...state,
        errorWasteCalculate: null,
        errorsGettingMainInformations: null,
        wasteCalculateResult: action.payload,
      };
    }
    case CLOSED_WELLCOME: {
      return {
        ...state,
        showWellcome: action.payload,
      };
    }

    case READED_BARCODE: {
      return {
        ...state,
        barcode: action.payload,
      };
    }

    case READ_PAYMENT_REQUESTS: {
      return {
        ...state,
        paymentRequestsError: null,
        paymentRequests: action.payload,
      };
    }

    case READ_PAYMENT_REQUESTS_ERROR: {
      return {
        ...state,
        paymentRequestsError: null,
      };
    }

    case READ_USER_MAIN_INFORMATIONS: {
      return {
        ...state,
        mainInformationRequestsError: null,
        mainInformations: action.payload,
      };
    }
    case READ_PAYMENT_REQUESTS_ERROR: {
      return {
        ...state,
        mainInformationRequestsError: action.payload,
        mainInformations: null
      };
    }


    default:
      return state;
  }
}
