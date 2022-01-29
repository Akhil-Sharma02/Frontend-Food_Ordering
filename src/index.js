import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./store/CartContext";

ReactDOM.render(
    <CartContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CartContextProvider>,
    document.getElementById("root")
);
