import React from "react";

import style from './AddLabTest.module.css';
import animated from "../../images/animated.gif";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function AddLabTest() {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  
  }
  
  const handleSubmit = (event) =>{
  event.preventDefault();
  
  axios.post('http://localhost/CasesApi/save', inputs).then(function(response){
   console.log(response.data);
   navigate('/Labtestlist');
  });
  
  }




  const [users, setUsers] = useState([]);


  useEffect(() => {
      getUsers();

  }, []);

function getUsers() {

axios.get("http://localhost/SelectLabNameApi/").then(function(response){
  console.log(response.data);
  setUsers(response.data);
});


}









  return (
   <>
   <div className={style.parent}>
   <div className={style.formParent}>
   <h3 className={style.head}>اضافه حاله جديدة</h3>
   <form onSubmit={handleSubmit}>
   <div className={style.inputs}>
    <label htmlFor="username" className={style.label}>الاسم</label><br />
  <input  type="text" id="name" name="name" className={style.input} onChange={handleChange} />
  </div>
  <div className={style.inputs}>
  <label htmlfor="username" className={style.label}>الهاتف</label><br/>
  <input  type="text" id="phone" name="phone" className={style.input} onChange={handleChange} />
  </div>
  <div className={style.inputs}>
  <label htmlfor="username" className={style.label}>العنوان</label><br/>
  <input  type="text" id="address" name="address" className={style.input} onChange={handleChange} />
  </div>
 
  <div className={style.inputs}>
  <label htmlfor="username" className={style.label}>الرقم القومى</label><br/>
  <input  type="text" id="SSN" name="SSN" className={style.input} onChange={handleChange} />
  </div>
  <div className={style.parentOption}>
     <label htmlFor="lab_name" className={style.label} >اسم المعمل</label><br />
 <select className={style.options} name="lab_name" onChange={handleChange}>
 {users.map((user, key) =>
      <option key={key} value={user.lab_name}>{user.lab_name}</option>
        )}
   
 </select>
     </div>
  <input type="file" id="myFile" name="filename"></input>
  <div >
    
    
{/* <div className={style.inputs}>
<label htmlfor="myfile">Select a file:</label>
<input type="file" id="myfile" name="myfile" />
</div> */}
 
  <input type="submit" name="submit" value="اضافه" className={style.submit}  />


  </div>

   </form>
 



  


</div>


<div className={style.image}>
  <img src={animated}  alt="dna"/>
  </div> 
   </div>





   </>
  );
}

export default AddLabTest;
