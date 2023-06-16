import React from "react";
import style from './EditUser.module.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import animated from "../../images/animated.gif";
import { useEffect } from "react";




function EditUser(){

  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const {id} = useParams();

  useEffect(() => {
      getUser();
  },[]);

  function getUser() {
      axios.get(`http://localhost/api/user/${id}`).then(function(response) {
          console.log(response.data);
          setInputs(response.data);
      });
  }

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  }
  const handleSubmit = (event) => {
      event.preventDefault();

      axios.put(`http://localhost/api/user/${id}/edit`, inputs).then(function(response){
          console.log(response.data);
          navigate('/Userlist');
      });
      
  }
  



  return (
   <>

   <div className={style.parent}>
   <div className={style.formParent}>
   <h3 className={style.head}>انشاء حساب</h3>
   <form onSubmit={handleSubmit}>
   <div className={style.inputs}>
     
     <label htmlFor="username" className={style.label}>اسم المستخدم</label><br/>
   <input  type="text" id="name" name="name" className={style.input} onChange={handleChange} value={inputs.name} />
   </div>
   <div className={style.inputs}>
   <label htmlFor="username" className={style.label}>البريد الالكترونى</label><br/>
   <input  type="text" id="email" name="email" className={style.input} onChange={handleChange} value={inputs.email}/>
   </div>
   <div className={style.inputs}>
   <label htmlFor="username" className={style.label}>الرقم القومى</label><br/>
   <input  type="text" id="SSN" name="SSN" className={style.input} onChange={handleChange} value={inputs.SSN} />
   </div>
   <div className={style.inputs}>
   <label htmlFor="username" className={style.label}>كلمه المرور</label><br/>
   <input  type="password"  name="password" className={style.input} onChange={handleChange} value={inputs.password}  />
   </div>
   <div >
    <div className={style.parentOption}>
     <label htmlFor="role" className={style.label} >الوظيفه</label><br />
 

     </div>
     
   <input type="submit" name="submit" value="تعديل" className={style.submit}  />

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

export default EditUser;
