import React, { useContext } from "react";
import CartContext from "../../store/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./CartButton.module.css";

const CartButton = () => {
    const cartCtx = useContext(CartContext);
    return (
        <button className={styles["cart-btn"]}>
            <span className={styles.text}>
                <FaShoppingCart className={styles["cart-icon"]} />
                Your Cart
            </span>
            <span className={styles.badge}>{cartCtx.cartLength}</span>
        </button>
    );
};

export default CartButton;
