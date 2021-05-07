import {
    PAYMENT_IN_PROCESS,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
} from '../actions/types';

const initialState = {success: false, inProcess: false, failed: false};

export default function (state = initialState, action) {
    switch (action.type) {
        case PAYMENT_SUCCESS:
            return {
                ...state,
                inProcess: false,
                success: true,
            };
        case PAYMENT_IN_PROCESS:
            return {
                ...state,
                inProcess: true,
            };
        case PAYMENT_FAIL:
            return {
                ...state,
                inProcess: false,
                success: false,
                failed: true,
            };
        default:
            return {...state, success: false, inProcess: false, failed: false};
    }
}
