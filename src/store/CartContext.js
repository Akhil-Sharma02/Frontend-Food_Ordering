import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const cartContext = createContext({
    cart: [],
    cartLength: 0,
    addItemHandler: (item) => {},
    incrementQtyHandler: (itemId) => {},
    decrementQtyHandler: (itemId) => {},
    placeOrderHandler: () => {},
});

export const CartContextProvider = (props) => {
    const initialItems = JSON.parse(
        window.localStorage.getItem("cart") || "[]"
    );

    const [cart, setCart] = useState(initialItems);

    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addItemHandler = (item) => {
        setCart((prevState) => {
            const isItemAvailable = prevState.some(
                (cartItem) => cartItem.id === item.id
            );
            if (isItemAvailable)
                return prevState.map((cartItem) =>
                    cartItem.id === item.id
                        ? {
                              ...cartItem,
                              qty: cartItem.qty + item.qty,
                          }
                        : cartItem
                );
            return [...prevState, item];
        });
    };

    const incrementQtyHandler = (itemId) => {
        setCart((prevState) => {
            return prevState.map((cartItem) =>
                cartItem.id === itemId
                    ? { ...cartItem, qty: cartItem.qty + 1 }
                    : cartItem
            );
        });
    };

    const decrementQtyHandler = (itemId) => {
        setCart((prevState) => {
            return prevState
                .map((cartItem) => {
                    if (cartItem.id === itemId) {
                        return { ...cartItem, qty: cartItem.qty - 1 };
                    }
                    return cartItem;
                })
                .filter((cartItem) => {
                    return cartItem.qty !== 0;
                });
        });
    };

    const placeOrderHandler = async () => {
        if (cart.length > 0) {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/placeOrder`,
                { cart }
            );
            setCart(() => []);
        }
    };

    const context = {
        cart: cart,
        cartLength: cart.length,
        addItemHandler: addItemHandler,
        incrementQtyHandler: incrementQtyHandler,
        decrementQtyHandler: decrementQtyHandler,
        placeOrderHandler: placeOrderHandler,
    };

    return (
        <cartContext.Provider value={context}>
            {props.children}
        </cartContext.Provider>
    );
};

export default cartContext;
