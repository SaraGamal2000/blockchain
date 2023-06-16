import React from "react";
import style from './FixedNav.module.css';



function FixedNav() {
  return (
<>
<div className={style.fixedNav}>
    <div className={style.container}>
    <p className={style.fixedHead}>Paternity Testing</p>
   <i className="fa-solid fa-dna"></i>
    </div>
</div>
</>
  );
}

export default FixedNav;