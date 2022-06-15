import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./List.module.scss";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faHeart
} from "@fortawesome/free-solid-svg-icons";


export default function List() {
    const [lists, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8001/api/places/")
            .then((res) => {
                console.log(res.data);
                setList(res.data);
            })
    }, []);
    return (
        <div>

            <div className={styles["imageList"]}>
                <img src="http://localhost:8001/user_1.png" alt="" width="500px" height="350px" />
            </div>
            <h2> Liste des places</h2>
            <p>{lists.map((value, key) => {
                return (<div>
                    <div className={styles.places}>
                        <div className={styles["image"]}>
                        <img src={value.image} alt="" />
                        </div>
                        <div>
                            <div className={styles["title"]} ><h1>{value.namePlace}</h1></div>
                            <h3 className={styles["description"]}>{value.descriptionPlace}</h3>
                            console.log({value.idP})
                            <div>
                                <Link to={`detail/${value.idP}`}>
                                    <button>Show More</button>
                                </Link>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faHeart} />
                                <span id="numberLike"></span>
                                <FontAwesomeIcon icon={faStar} />
                            </div>

                        </div>
                    </div>
                </div>
                );

            })}</p>
        </div>

    );
}