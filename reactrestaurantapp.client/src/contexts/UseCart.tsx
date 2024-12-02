
import { useState } from "react";

import { MenuItemModel } from "../models/MenuItemModel";
import { ProductModel } from "../models/ProductModel";


export const useCart = () => {
    const [cart, setCart] = useState<MenuItemModel[]>([]);
    const handleAddProduct = (newProduct:ProductModel) => {
        const newMenuItem={
             id: cart.length + 1,
             product: newProduct
            , quantity: 1


        };
        addToCart(newMenuItem);
    };

    const addToCart = (menuItem: MenuItemModel) => {
        setCart((prevCart) => [...prevCart, menuItem]);
    };


    return { cart, addToCart, handleAddProduct };
};








