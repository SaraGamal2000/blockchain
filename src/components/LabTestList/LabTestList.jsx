import React from "react";
import DashNav from "../DashNav/DashNav";
import { Outlet, Link } from "react-router-dom";
import style from './LabTestList.module.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function LabTestList() {



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

axios.get("http://localhost/TestLabApi/index.php").then(function(response){
    console.log(response.data);
    setCases(response.data);
});

}










  return (
   <>
   <DashNav  />

<div className={style.heading}>
    <div>
      <h4>قائمه التحليلات</h4>
    </div>
    
</div>
 <Link to="/Addcase" className={style.link}>اضافه حاله جديدة</Link> 
<Link to="/" className={style.home}>الصفحه الرئيسية<i className="fa-solid fa-arrow-left"></i></Link>



   <table className={style.styledtable}>
    <thead>
        <tr>
           <th>اسم المعمل</th>
            <th>الاسم</th>
            <th>الهاتف</th>
            <th>العنوان</th>
            <th>التاريخ</th>
            <th>الرقم القومى</th>
        </tr>
    </thead>
    <tbody>
    
    {cases.map((Case, key) =>
        <tr key={key}>
            <td>{Case.lab_name}</td>
            <td>{Case.name}</td>
            <td>{Case.phone}</td>
            <td>{Case.address}</td>
            <td>{Case.date}</td>
            <td>{Case.SSN}</td>
        </tr>
        )}
       
       
      
    </tbody>
</table>
   </>
  );
}

export default LabTestList;