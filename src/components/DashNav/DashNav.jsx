import React from "react";
import style from './DashNav.module.css';
import FixedNav from "../FixedNav/FixedNav";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function DashNav() {
  const naviget = useNavigate();
  function logoutSubmit(){
      localStorage.setItem("login", "");
      localStorage.setItem("name", "");
      localStorage.setItem("loginStatus", "Logged out successfully!")
      naviget("/LoginDash");
  }
  return (
   <>
   <FixedNav/>
    <div className={style.dashNav}>
      <div className={style.list}>
      <i class="fa-solid fa-vial-virus"></i>
      <Link to="/Lablist"><p>قائمه المعامل</p></Link>
      </div>
     <div className={style.list}>
      <i class="fa-solid fa-user"></i>
      <Link to="/Userlist"><p>قائمه المستخدمين</p></Link>
      </div> 
      <div className={style.list}>
      <i class="fa-solid fa-vial-virus"></i>
      <Link to="/Resultlist"><p>قائمه النتائج</p></Link>
      </div>
      <div className={style.list}>
      <i class="fa-solid fa-vial-virus"></i>
      <Link to="/SearchBar"><p>قائمه التحاليل</p></Link>
      </div>
      <div className={style.list}>
      <i class="fa-solid fa-message"></i>
      <Link to="/Messagelist"><p>الرسائل</p></Link>
      </div>
      <div className={style.list}>
      <i class="fa-solid fa-right-from-bracket"></i>
       <p onClick={logoutSubmit}>تسجيل الخروج</p> 
      
      </div>

    </div>
   </>
  );
}

export default DashNav;
