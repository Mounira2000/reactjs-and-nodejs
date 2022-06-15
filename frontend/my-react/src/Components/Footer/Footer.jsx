import React from "react";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHouse,
	faCommentDots,
    faHeart
} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";



function Footer (){
    return (
        <>
            <div className={styles["container-footer"]}>
                <div>
                <NavLink to="/act">
                    <FontAwesomeIcon className={styles["indigo"]} icon={faHouse}/>
                </NavLink>
                </div>
                
                <div>
                <NavLink to="/act/chat">
                    <FontAwesomeIcon className={styles["indigo"]} icon={faCommentDots}/>
                </NavLink>
                </div>
                
                <div>
                <NavLink to="/act/favPlace">
                    <FontAwesomeIcon className={styles["indigo"]} icon={faHeart}/>
                </NavLink>
                </div>
               
            </div>
        </>
    );

}
export default Footer;