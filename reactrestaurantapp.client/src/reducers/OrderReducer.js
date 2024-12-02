import { CREATE_ORDER, ORDER_SUCCESS, ORDER_FAILURE } from "../actions/OrderActions";

const initialState = {
    currentOrder: null,
    loading: false,
    error: null,
    success: false,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state,
                currentOrder: action.payload,
                loading: true,
                error: null,
                success: false,
            };
        case ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };
        default:
            return state;
    }
};

export default orderReducer;