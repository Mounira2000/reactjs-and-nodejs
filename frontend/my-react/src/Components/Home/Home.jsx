import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.scss";
import logo from "./../../asset/beninFlag.png";

function Home (){
    return (
        <>
            <div className={styles["container"]} >
                <h1 className={styles["title"]}> Visit BENIN</h1>
            
                    <img src={logo} alt="" className="logo"/>
                
                <div className={styles["button-home"]}>
                        <NavLink to="/register">
                           Register
                        </NavLink>
                        <NavLink to="login">
                            Login
                        </NavLink>
                </div>
                
            </div>
        </>
    );

}
export default Home;