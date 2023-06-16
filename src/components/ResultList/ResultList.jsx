import React from "react";
import DashNav from "../DashNav/DashNav";
import { Outlet, Link } from "react-router-dom";
import style from './ResultList.module.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function ResultList() {

    const [auth, setAuth] = useState('');
    let navigate = useNavigate();
    
    useEffect(()=>{
        var auth = localStorage.getItem('name');
        setAuth(auth);
    },[])
    if (auth===null){
        navigate('/LoginDash');
    }




    const [cases, setCases] = useState([]);



    useEffect(() => {
        getCases();

    }, []);

function getCases() {

axios.get("http://localhost/CasesApi/save").then(function(response){
    console.log(response.data);
    setCases(response.data);
});

}










  return (
   <>
   <DashNav  />

<div className={style.heading}>
    <div>
      <h4>قائمه النتائج</h4>
    </div>
    
</div>
{/* <Link to="/Addcase" className={style.link}>اضافه حاله جديدة</Link> */}
<Link to="/" className={style.home}>الصفحه الرئيسية<i className={`${style.arrow} fa-solid fa-arrow-left`}></i></Link>


   <table className={style.styledtable}>
    <thead>
        <tr>
            <th>التسلسل</th>
            <th>الاسم</th>
            <th>الهاتف</th>
            <th>العنوان</th>
            <th>وضع الحاله</th>
            <th>الاسم</th>
            <th>التاريخ</th>
            <th>الرقم القومى</th>
        </tr>
    </thead>
    <tbody>
    {cases.map((user , key) =>
        <tr key={key}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.address}</td>
            <td>{user.status}</td>
            <td>{user.other_name}</td>
            <td>{user.date}</td>
            <td>{user.SSN}</td>

        </tr>
        )}
       
      
    </tbody>
</table>
   </>
  );
}

export default ResultList;