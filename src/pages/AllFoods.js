import React, { useState, Fragment, useEffect } from "react";
import FoodList from "../components/foods/FoodList";
import axios from "axios";
import Banner from "../assets/banner2.jpg";
import styles from "./AllFoods.module.css";

const AllFoods = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        async function getFoods() {
            try {
                const res = await axios.get(
                    "https://server-food-ordering.herokuapp.com/allfoods"
                );
                setFoods(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getFoods();
    }, []);

    return (
        <Fragment>
            <section className={styles.poster}>
                <img src={Banner} alt="Food Banner" />
            </section>
            <FoodList foods={foods} />
        </Fragment>
    );
};

export default AllFoods;
