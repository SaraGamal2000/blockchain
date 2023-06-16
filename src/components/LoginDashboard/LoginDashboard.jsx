import React from "react";
import style from './LoginDashboard.module.css';
import {  useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import animated from "../../images/animated.gif";
import { Link } from "react-router-dom";


function LoginDashboard() {
  const naviget = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  

  useEffect(() => {
      let login = localStorage.getItem("login");
      /* if(login){
          naviget("/Userlist");
      } */
      let loginStatus = localStorage.getItem("loginStatus");
      if(loginStatus){
          setError(loginStatus);
          setTimeout(function(){
              localStorage.clear();
              window.location.reload();
          }, 3000);
      }
      setTimeout(function(){
          setMsg("");
      }, 3000);
  }, [msg]);

  const handleInputChange = (e, type) => {
      switch(type){
          case "user":
              setError("");
              setUser(e.target.value);
              if(e.target.value === ""){
                  setError("Username has left blank");
              }
              break;
          case "pass":
              setError("");
              setPass(e.target.value);
              if(e.target.value === ""){
                  setError("Password has left blank");
              }
              break;

          default:
      }
  }

  function loginSubmit(){
      if(user !== "" && pass !== "" ){
          var url = "http://localhost/loginapi/login3.php";
          var headers = {
              "Accept": "application/json",
              "Content-type": "application/json"
          };
          var Data = {
              user: user,
              pass: pass,
          };
          fetch(url, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(Data)
          }).then((response) => response.json())
          .then((response) => {
              if(response[0].result === "Invalid username!" || response[0].result === "Invalid password!"){
                  setError(response[0].result);
              }
              else{
                  setMsg(response[0].result);
                  setTimeout(function(){
                      localStorage.setItem("login", true);
                      localStorage.setItem("name", user);
                      localStorage.setItem("token", response[0].token);
                      console.log(localStorage);

                      naviget("/Userlist");
                  }, 3000);
              }
          }).catch((err) => {
              setError(err);
              console.log(err);
          })
      }
      else{
          setError("All field are required!")
      }
  }








  return (
    <>
    <div className={style.parent}>
    <div className={style.formParent}>
    <h3 className={style.head}>تسجيل دخول</h3>
 
            <p>
                {
                    error !== "" ?
                    <span className="error danger">{error}</span> :
                    <span className="success">{msg}</span>
                }
            </p>
            <div className={style.inputs}>
            <label className={style.label}>اسم المستخدم</label>
            <input 
            className={style.input}
                type="text" 
                value={user}
                onChange={(e) => handleInputChange(e, "user")}

            />
            </div>
          <div className={style.inputs}>
          <label className={style.label}>كلمه المرور</label>
            <input 
            className={style.input}
                type="password" 
                value={pass}
                onChange={(e) => handleInputChange(e, "pass")}
            />
          </div>
 {/* <select value={role} className={style.inputs}  onChange={(e) => handleInputChange(e, "role")}>
  <option >ادارى</option>
  <option >مدير معمل</option>
</select> */}
            <input 
                type="submit"
                value="تسجيل الدخول" 
                className={style.submit}
                onClick={loginSubmit}
            />
            <p className={style.last}>ليس لديك حساب؟ <Link to="/Signup" className={style.link} >انشاء حساب</Link></p>
     </div>
     <div className={style.image}>
     <img src={animated}  alt="animated-gif" />
     </div> 
     </div>
     

    </>
    
  );
}

export default LoginDashboard;