import React from "react";

import style from './Login.module.css';



function Login() {
  return (
  <>
  <div className={style.parent}>
  <div className={style.formParent}>
  <h3 className={style.head}>تسجيل دخول</h3>
  <form>
    
    <div className={style.inputs}>
    <label for="username">اسم المستخدم</label><br/>
  <input  type="text" id="username" name="username" className={style.text}  />
    </div>
<div className={style.inputs}>
<label for="password">كلمه المرور</label><br/>
  <input type="password" id="password" name="password" className={style.password}  />

</div>
  
 


<input type="submit" name="submit" value="تسجيل دخول" className={style.submit} />
<p className={style.last}>ليس لديك حساب؟ <a className={style.link} href="">انشاء حساب</a></p>
  </form >

  </div>


 {/*   <div className={style.image}>
  <img src={dna} alt="dna"/>
  </div>  */}

  </div>



 

 
  
  </>
  );
}

export default Login;