
import { MenuItemModel } from "../models/MenuItemModel";
import { useCart } from "../contexts/UseCart";
import { Link } from "react-router-dom";


const CartComponent = () => {
    const { cart } = useCart();


    return (
        <div>
            <ul>
                {cart.map((menuItem:MenuItemModel) => (
                    <li key={menuItem.product.id}>
                        {menuItem.product.name} - ${menuItem.product.price}
                    </li>
                ))}
            </ul>
            <Link to="order" > Order Now </Link>
        </div>
    );
};

export default CartComponent;
