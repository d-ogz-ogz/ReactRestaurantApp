
import { Order } from "../models/Order"
export const GetOrders = async (userId: number): Promise<Order> => {
    const response = await fetch(`/Order/GetOrders?userId=${userId}`, {
        headers: {
            "ContentType":"application/json"
        }
    })
    if (!response.ok) {
        throw new Error("");
    }
    const data: Order = await response.json();

    return data;
    }


export const AddOrder = async (order:Order):Promise<boolean> => {
    const responseOrder = await fetch("/Order/AddOrder", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":String( localStorage.getItem("token"))
        },
        body: JSON.stringify(order)

    }
    )
    if (!responseOrder.ok) {
        throw new Error("");
    }
    return true;
}