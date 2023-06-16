import React from "react";
import style from './MessageList.module.css';
import DashNav from "../DashNav/DashNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function MessageList() {

    const [messages, setUsers] = useState([]);


    useEffect(() => {
        getUsers();

    }, []);

function getUsers() {

axios.get("http://localhost/MessageApi").then(function(response){
    console.log(response.data);
    setUsers(response.data);
});

}














  return (
   <>
   <DashNav  />
   <Link to="/" className={style.home}>الصفحه الرئيسية<i className="fa-solid fa-arrow-left"></i></Link>

   <table className={style.styledtable}>
    <thead>
        <tr>
        <th>التسلسل</th>
        <th>name</th>
            <th>البريد الالكترونى</th>
            <th>الرساله</th>
           
        </tr>
    </thead>
    <tbody>
    {messages.map((message, key) =>
        <tr key={key}>
             <td>{message.id}</td>
            <td>{message.email}</td>
            <td>{message.email}</td>
            <td>{message.message}</td>
        </tr>
        )}
      
   
      
    </tbody>
</table>

 
   </>
  );
}

export default MessageList;