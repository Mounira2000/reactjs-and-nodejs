import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListDepartment () {
    const [listDepartment, setListDepartment] = useState([]);
    useEffect( ()=>{
        axios.get("http://localhost:8001/api/departments/").then((res)=>{
            console.log(res.data);
            setListDepartment(res.data);
        },[]);
    })
    return(
        <div>
            <h1>ListDepartment</h1>
            <div>{listDepartment.map((value,key)=>{
                return <div >
                    <div>

                    </div>
                    <div>
                        <h1>{value.departmentName} </h1>
                        <h3>{value.departmentDes} </h3>
                    </div>
                </div>;})}
            </div>
        </div>
    );
}