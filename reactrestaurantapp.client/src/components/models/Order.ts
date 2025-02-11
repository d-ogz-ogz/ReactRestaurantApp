import { MenuItem } from "./MenuItemModel";
import { OrderDetails } from "./OrderDetails";

export class Order {
    id!: number;
    orderItems: MenuItem[] = [];
    orderDetails!: OrderDetails;


   

}

 
