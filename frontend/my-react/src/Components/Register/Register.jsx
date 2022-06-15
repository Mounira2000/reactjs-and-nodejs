import React from "react";
import {Formik, Form, Field, ErrorMessage }from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./Register.module.scss";
import {NavLink} from "react-router-dom";

function Register (){

    const initialValues ={
        emailUser: "",
        nameUser: "",
        passwordUser: "",
    }

    const onSubmit =(data) =>{
        axios.post("http://localhost:8001/api/users/",data)
            .then((res)=>{
                console.log("it works for the frontend, it will be save in the database if there id not yet this email in the database... i have to finf another way to do things");
            })
            .catch((err)=>{
                console.log(err);
                console.log("user not create");
            })
    };

    const ValidationSchema = Yup.object().shape({
        emailUser: Yup.string().required("You have to put your mail"),
        nameUser: Yup.string().required("you have to put your name"),
        passwordUser: Yup.string().required("you have to put a correcte password"),
    });

    return (
        <div className={styles["whole"]}>
            <div className={styles["regisComp"]}>
                <h1 className={styles["regisHead"]}> Register</h1>
                <div className={styles["bar"]}></div>
            
                <div>
                    <Formik 
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={ValidationSchema}
                    >
                        <Form>
                            <div  className={styles["inputRegis"]}>
                                <div><ErrorMessage className={styles["error"]} name="emailUser"/></div>
                                <label htmlFor="">Email:</label>
                                <Field className={styles["inputR"]} name="emailUser" placeholder="Enter you email address please"/>
                            </div>
                            <div className={styles["inputRegis"]}>
                            <div><ErrorMessage name="nameUser"/></div>
                                <label htmlFor="">Name:</label>
                                <Field  name="nameUser" placeholder="Enter your name please"/>
                            </div>
                            <div className={styles["inputRegis"]}>
                                <div><ErrorMessage name="passwordUser"/></div>
                                <label htmlFor="">Password:</label>
                                <Field className={styles["inputRegis"]} name="passwordUser" placeholder="Enter you password please"/>
                            </div>
                            
                            <button type="submit">Submit</button>
                           
                            <h3>Have already an account?</h3>
                            <NavLink to="/login">
                                <button className={styles["regisButton"]}>Login</button>
                            </NavLink>
                            
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );

}
export default Register;