import React from "react";
import styles from "./Header.module.scss";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{
    faUser
} from "@fortawesome/free-solid-svg-icons";

function Header (){
    return (
        <>
            <div className={styles["container-head"]}>
                
                <div>
                    <NavLink to="userParameter">
                    <FontAwesomeIcon className={styles["indigoUser"]} icon={faUser}/>
                    </NavLink>
                </div>
            </div>
        </>
    );

}
export default Header;