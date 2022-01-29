import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import styles from "./MyCart.module.css";

const MyCart = () => {
    const cartCtx = useContext(CartContext);

    const cart = cartCtx.cart;

    let totalPrice = 0;
    cart.map((item) => {
        totalPrice += item.qty * item.price;
    });

    const placeOrderHandler = () => {
        cartCtx.placeOrderHandler();
    };

    return (
        <ul className={styles.cart}>
            <li>My Cart</li>
            {cart.map((item) => {
                return (
                    <li className={styles["cart-food"]} key={item.id}>
                        <div>
                            <p className={styles["item-name"]}>
                                {item.name} X {item.qty}
                            </p>
                            <p className={styles["item-desc"]}>{item.desc}</p>
                            <p className={styles["item-price"]}>
                                ${item.price}
                            </p>
                        </div>
                        <div className={styles["btn-div"]}>
                            <button
                                onClick={() =>
                                    cartCtx.decrementQtyHandler(item.id)
                                }
                            >
                                -
                            </button>
                            <button
                                onClick={() =>
                                    cartCtx.incrementQtyHandler(item.id)
                                }
                            >
                                +
                            </button>
                        </div>
                    </li>
                );
            })}
            <li>
                Total: {totalPrice}
                <span>
                    <button
                        className={styles["place-btn"]}
                        onClick={placeOrderHandler}
                    >
                        Place Order
                    </button>
                </span>
            </li>
        </ul>
    );
};

export default MyCart;
