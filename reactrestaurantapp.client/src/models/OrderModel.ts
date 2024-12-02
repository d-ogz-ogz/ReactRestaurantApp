import { MenuItemModel } from "./MenuItemModel";

export class OrderModel {

    id!: number;
    shippingAddress!: string;
    receiverName!: string;
    contactNumber!: string;
    grandTotal!: number
    city!: string;
    sameAddress: boolean = false;
    district!: string;
    billingAddress!: string;

   public products!: MenuItemModel[] ;

}


     