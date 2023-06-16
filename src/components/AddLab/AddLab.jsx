import React from "react";
import style from "./AddLab.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import animated from "../../images/animated.gif";
import { useEffect } from "react";




function AddLab() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  
  }
  
  const handleSubmit = (event) =>{
  event.preventDefault();
  
  axios.post('http://localhost/LabApi/save', inputs).then(function(response){
   console.log(response.data);
   navigate('/Lablist');
  });
  
  }




  const [users, setUsers] = useState([]);


  useEffect(() => {
      getUsers();

  }, []);

function getUsers() {

axios.get("http://localhost/selectapi").then(function(response){
  console.log(response.data);
  setUsers(response.data);
});

}









  return (
   <>

   <div className={style.parent}>
   <div className={style.formParent}>
   <h3 className={style.head}>اضافه معمل جديد</h3>
   <form onSubmit={handleSubmit}>
   <div className={style.inputs}>
     
     <label htmlFor="username" className={style.label}>اسم المعمل</label><br/>
   <input  type="text" id="lab_name" name="lab_name" className={style.input} onChange={handleChange} />
   </div>
   
   <div className={style.parentOption}>
     <label htmlFor="role" className={style.label} >منسق المعمل</label><br />
 <select className={style.options} name="name" onChange={handleChange}>
 {users.map((user, key) =>
      <option key={key} value={user.name}>{user.name}</option>
        )}
   
 </select>
     </div>

   
  
   <div className={style.inputs}>
   <label htmlFor="username" className={style.label}>العنوان</label><br/>
   <input  type="text" id="address" name="address" className={style.input} onChange={handleChange} />
   </div>
  
   <div >
   <input type="submit" name="submit" value="انشاء حساب" className={style.submit}  />
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

export default AddLab;
