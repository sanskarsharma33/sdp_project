import {GET_ERRORS, PAYMENT_FAIL} from '../actions/types';

const initialState = {
    msg: {},
    status: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            console.log(action);
            return {
                msg: action.payload.msg,
                status: action.payload.status,
            };
        case PAYMENT_FAIL:
            return {
                msg: {payment: true},
                status: 'payment Error',
            };
        default:
            return state;
    }
}
