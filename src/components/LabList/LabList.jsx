import React from "react";
import style from './LabList.module.css';
import DashNav from "../DashNav/DashNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LabList() {


    // const [auth, setAuth] = useState('');
    // let navigate = useNavigate();
    
    // useEffect(()=>{
    //     var auth = localStorage.getItem('login');
    //     setAuth(auth);
    // },[])
    // if (auth===null){
    //     navigate('/LoginDash');
    // }
    //const use= [];
    const [users, setUsers] = useState(users);


    useEffect(() => {
        getUsers();

    }, []);

function getUsers() {

axios.get("http://localhost/LabApi/save").then(function(response){
    console.log(response.data);
    setUsers(response.data);
});

}














  return (
   <>
   <DashNav  />

<div className={style.heading}>
    <div>
        <h4>قائمه المعامل</h4>
    </div>
    
</div>
<Link to="/AddLab" className={style.link}>اضافه معمل جديد</Link>
<Link to="/" className={style.home}>الصفحه الرئيسية<i className={`${style.arrow} fa-solid fa-arrow-left`}></i></Link>



   <table className={style.styledtable}>
    <thead>
        <tr>
            <th>اسم المعمل</th>
            <th>منسق المعمل</th>
            <th>العنوان</th>
        </tr>
    </thead>
    <tbody>
    {users.map((lab, key) =>
        <tr key={key}>
            <td>{lab.lab_name}</td>
            <td>{lab.name}</td>
            <td>{lab.address}</td>
        </tr>
        )}
      
   
      
    </tbody>
</table>
   </>
  );
}

export default LabList;