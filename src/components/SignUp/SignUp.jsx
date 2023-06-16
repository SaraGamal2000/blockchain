import React from "react";
import style from './SignUp.module.css';
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import animated from "../../images/animated.gif";




const SignUp=(props)=>{
  let history = useNavigate(); // Use for Navigate on Previous
  const [data, setData]=useState({
      name:"",
      email:"",
      password:"",
      SSN:"",
      role:""
  })

  const handleChange=(e)=>{
      setData({ ...data, [e.target.name]: e.target.value }); 

      console.log(data)
  }
 
  const submitForm=(e)=>{
      e.preventDefault(); 
     const sendData = {
          name:data.name,
          email:data.email,
          password:data.password,
          SSN:data.SSN,
          role:data.role

      }

      console.log(sendData);

      axios.post('http://localhost/registerapi/insert.php',sendData)
      .then((result)=>{
          if (result.data.Status === 'Invalid') { 
        alert('Invalid User');  
          }
      else  {
         //props.history.push('/Dashboard')  
         //props.history.push('/Dashboard') Redirect
         history('/LoginDash')
      }
    })  
  }








  return (
   <>

   <div className={style.parent}>
   <div className={style.formParent}>
   <h3 className={style.head}>انشاء حساب</h3>
   <form onSubmit={submitForm}>
   <div className={style.inputs}>
     
     <label htmlFor="username" className={style.label}>اسم المستخدم</label><br/>
   <input  type="text" id="name" name="name" className={style.input} onChange={handleChange} value={data.name} />
   </div>
   <div className={style.inputs}>
   <label htmlFor="username" className={style.label}>البريد الالكترونى</label><br/>
   <input  type="text" id="email" name="email" className={style.input} onChange={handleChange} value={data.email}/>
   </div>
   <div className={style.inputs}>
   <label htmlFor="username" className={style.label}>الرقم القومى</label><br/>
   <input  type="text" id="SSN" name="SSN" className={style.input} onChange={handleChange} value={data.SSN} />
   </div>
   <div className={style.inputs}>
   <label htmlFor="username" className={style.label}>كلمه المرور</label><br/>
   <input  type="password"  name="password" className={style.input} onChange={handleChange} value={data.password}  />
   </div>
   <div >
    <div className={style.parentOption}>
     <label htmlFor="role" className={style.label} >الوظيفه</label><br />
 
 <select className={style.options} name="role" onChange={handleChange} value={data.role}>
   <option >إداري</option>
   <option >مدير المعمل</option>
   <option >مستخدم</option>
 </select>
     </div>
     
   <input type="submit" name="submit" value="انشاء حساب" className={style.submit}  />
 <p className={style.last}> لديك حساب؟<Link className={style.link} to="/LoginDash">سجل مجانا</Link></p>
   </div>

</form>
    
</div>
<div className={style.image}>
  <img src={animated}  alt="animated-gif"/>
  </div> 
   </div>
   </>
  );
}

export default SignUp;
