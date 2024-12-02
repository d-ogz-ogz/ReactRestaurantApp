import { OrderModel } from "../models/OrderModel"
import { Dispatch } from "redux";
import { ORDER_FAILURE, ORDER_SUCCESS, CREATE_ORDER } from "../actionTypes/OrderActionTypes"


export const OrderSuccess = () => {
    return {
        type: ORDER_SUCCESS

    }
}
export const OrderFailure = (error: string) => {
    return {
        type: ORDER_FAILURE,
        payload: error
    }
}

export const CreateOrder = (order: OrderModel) => {
    return {
        type: CREATE_ORDER,
        payload: order


    }

}

export const SubmitOrder = (order: OrderModel) => {
    return async (dispatch: Dispatch): Promise<void> => { 
        dispatch({ type: "CREATE_ORDER", payload: order }); 
        try {
            await sendRequest(order);  
            dispatch(OrderSuccess());  
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Bilinmeyen bir hata oluþtu";
            dispatch(OrderFailure(errorMessage));  
        }
    };
};

const sendRequest = async (order: OrderModel) => {
    const response = await fetch("Order/CreateOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "token"
        },
        body: JSON.stringify(order)
    });

    if (!response.ok) {
        throw new Error("ERROR");
    }
    return await response.json();
};
