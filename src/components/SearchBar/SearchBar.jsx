import React from "react";
import style from './SearchBar.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashNav from "../DashNav/DashNav";




function SearchBar() {

    const [Cases, setCases] = useState([]);

    // useEffect(() => {
    //     getCases();

    // }, []);

    function getCases() {
        const labName = document.getElementsByName('lab_name')[0].value;
        const apiUrl = `http://localhost/CaseApi1/cases${labName ? `?lab_name=${encodeURIComponent(labName)}` : ''}`;
        axios.get(apiUrl).then(function(response){
            console.log(response.data);
            setCases(response.data);
        });
    }

    function onSubmit(event) {
        event.preventDefault();
        getCases();
      }
  return (
 <>
<DashNav />

{/*    <input  type="text" name="lab_name" placeholder="ادخل اسم المعمل" className={style.input} onChange={getCases} />
   <input type="submit" name="submit" value="تأكيد" className={style.submit}  /> */}
<form onSubmit={onSubmit}>
<div className={style.wrap}>
   <div className={style.search}>
   <button type="submit" class={style.searchButton} onSubmit={onSubmit}>
        <i class="fa fa-search"  ></i>
     </button>
      <input type="text" name="lab_name" className={style.searchTerm} placeholder="ابحث عن التحاليل الخاصة بمعملك"  />
    
   </div>
</div>
</form>




   <table className={style.styledtable}>
    <thead>
        <tr>
            <th>الرقم</th>
            <th>الاسم</th>
            <th>الهاتف</th>
            <th>العنوان</th>
            <th>التاريخ</th>
        </tr>
    </thead>
    <tbody>
        {Cases.map((patient, key) =>
        <tr key={key}>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td>{patient.phone}</td>
            <td>{patient.address}</td>
            <td>{patient.date}</td>
        </tr>
        )}
      
    </tbody>
</table>
 </>
  );
}

export default SearchBar;