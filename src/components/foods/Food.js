import React, { useContext, useRef } from "react";
import CartContext from "../../store/CartContext";
import styles from "./Food.module.css";

const Food = (props) => {
    const cartCtx = useContext(CartContext);
    const foodQty = useRef();
    const addToCart = () => {
        cartCtx.addItemHandler({
            id: props.id,
            name: props.name,
            desc: props.desc,
            price: props.price,
            qty: parseInt(foodQty.current.value),
        });
    };
    return (
        <li className={styles.food}>
            <div>
                <p className={styles.name}>{props.name}</p>
                <p className={styles.desc}>{props.desc}</p>
                <p className={styles.price}>${props.price}</p>
            </div>
            <div className={styles["amount-div"]}>
                <label>Amount</label>
                <input type="number" min="1" defaultValue="1" ref={foodQty} />
                <button onClick={addToCart} className={styles["add-btn"]}>
                    +Add
                </button>
            </div>
        </li>
    );
};

export default Food;
