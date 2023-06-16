import React from "react";
import style from "./AddMessage.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import animated from "../../images/animated.gif";
import { useEffect } from "react";
import email from "../../images/Email 1.svg";



function AddMessage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  
  }
  
  const handleSubmit = (event) =>{
  event.preventDefault();
  
  axios.post('http://localhost/MessageApi/save', inputs).then(function(response){
   console.log(response.data);

   navigate('/');
  });
  
  }




 







  return (
   <>
<h1>تواصل معنا</h1>

   <div className={style.parent}>
   <div className={style.formParent}>
   
   <form onSubmit={handleSubmit}>
   <div className={style.inputs}>
     
     <label htmlFor="username" className={style.label}>الاسم</label><br/>
   <input  type="text"  name="name" className={style.input} onChange={handleChange} />
   </div>
   <div className={style.inputs}>
     
     <label htmlFor="email" className={style.label}>البريد الالكتروتى</label><br/>
   <input  type="text"  name="email" className={style.input} onChange={handleChange} />
   </div>
   
   

   <div className={style.inputs}>
  
   <label htmlFor="message" className="labeling">اترك رسالة</label>
      <textarea  type="text" onChange={handleChange} placeholder="اترك رسالتك وسنتواصل معك" id="message" className="inputtext" name="message" cols="35"  ></textarea>
  </div>
   <div >
   <input type="submit"  name="submit" value="تواصل معنا" className={style.submit}  />
   </div>

</form>
    
</div>
<div className={style.image}>
  <img src={email}  alt="animated-gif"/>
  </div>

   </div>
   </>
  );
}

export default AddMessage;
