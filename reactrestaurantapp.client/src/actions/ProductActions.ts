import {GET_PRODUCTS,GET_PRODUCTS_FAILURE,productList } from "../actionTypes/ProductActionTypes"
import { Dispatch } from "redux";


export const GetProducts = () => {
    return {
        type: GET_PRODUCTS,
        payload: productList
    }
}
export const GetProductsFailure = (err: string) => {
    return {
        type: GET_PRODUCTS_FAILURE,
        payload: err
    }
}


export const GetItems = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(GetProducts())
        try {
            const items = await sendRequest();
            dispatch({ type: GET_PRODUCTS, payload: items })
        } catch (err: unknown) {
            const errMessage = err instanceof Error ? err.message : "Error Occured"
            dispatch(GetProductsFailure(errMessage))
        }
    }
}


const sendRequest = async () => {
    const response = await fetch("Item/GetItems", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("ERROR");
    }
    return await response.json();
};


