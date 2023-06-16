
import React from "react";
import style from "./UserProfile.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function UserProfile() {

        const navigate = useNavigate();

        const [inputs, setInputs] = useState({})
      
        const handleChange = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({...values, [name]: value}));
        
        }
        
        const handleSubmit = (event) =>{
        event.preventDefault();
        
        axios.post('http://localhost/loginapi1/api/User/login.php/save', inputs).then(function(response){
         console.log(response.data);
         navigate('/AddLab');
        });
        
        }
      
      











    return (

            <>
            <h1>email: </h1>
            <h1>username: </h1>
            </>
    );
  }
  
  export default UserProfile;
  