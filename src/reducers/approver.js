import {
    READ_APPROVER_REQUESTS_GETTING,
    READ_APPROVER_REQUESTS_COMPLETED,
    READ_APPROVER_REQUESTS_ERROR, COMPLETE_OPERATION, COMPLETE_OPERATION_ERROR
} from '../constants/approver';

const INITIAL_STATE = {
    error: null,
    getting: false,
    operationComplete: false,
    requests: [{
        accountId: "",
        status: "",
        createdUser: {
            id: "",
            firstname: "",
            lastname: ""
        },
        contents: [{
            typeId: "", typeName: "", amount: 0, unitPrice: 0, totalPrice: 0
        }],
        amount: 0.0,
        totalPrice: 0.0
    }]
};

INITIAL_STATE.requests = [];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case READ_APPROVER_REQUESTS_GETTING: {
            return {
                ...state,
                operationComplete: false,
                getting: action.payload,
            };
        }

        case READ_APPROVER_REQUESTS_COMPLETED: {
            return {
                ...state,
                operationComplete: false,
                requests: action.payload,
            };
        }

        case READ_APPROVER_REQUESTS_ERROR: {
            return {
                ...state,
                operationComplete: false,
                error: action.payload
            };
        }
        case COMPLETE_OPERATION: {
            return {
                ...state,
                operationComplete: action.payload
            };
        }
        case COMPLETE_OPERATION_ERROR: {
            return {
                ...state,
                operationComplete: false,
                error: action.payload
            };
        }

        default:
            return state;
    }
}
