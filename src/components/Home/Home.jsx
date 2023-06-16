import React from "react";
import style from "./Home.css";
import animated from "../../images/animated.gif";
import story from "../../images/final_dna_tree.jpg";
import drahmed from "../../images/dr_ahmed.jpg";
import samah from "../../images/samah1.jpg";
import reem from "../../images/reem1.jpg";
import mysoon from "../../images/maysson.jpg";
import mahy from "../../images/mahy1.jpg";
import dalia from "../../images/dalia.jpg";
import AddMessage from "../AddMessage/AddMessage";
import { Link } from "react-router-dom";
import sara from "../../images/sara.jpg";


function Home() {
    return (
        <>
        <div className="landing-page">
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-transparent">
          <div className="container-fluid mt-2">
            <a className="navbar-brand" href="" >logo</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa-solid fa-bars icon"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#index.php">الصفحه الرئيسية</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#ourstory">رحلتنا</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#howitworks">كيف يعمل</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#aboutus">فريق العمل</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contactus">تواصل معنا</a>
                </li>
              
                <li className="nav-item">
                  <Link to="/LoginDash" className="nav-link logging font submit" >تسجيل الدخول</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Signup" className="nav-link logging font submit" >انشاء الحساب</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link logging" href="user_profile.php"><i className="fa-solid fa-user"></i></a>
                </li>
              </ul>
              
            </div>
          </div>
        </nav>
        <div className="intro">تساعدنا تقنية البلوك تشين على حماية بياناتنا الجينية</div>
  </div>
  </div>

{/*   <div className="story text-align-center" id="ourstory">
        <h1 className="head">our story</h1>
        <div className="container ">
          <div className="row text-center align-items-center">
            <div className="col-6 our-story">
              Due to the spread of the phenomenon of missing children, especially the phenomenon of kidnapping children, as well as the phenomenon of losing people with mental illnesses and the elderly, especially those with Alzheimer's disease, which represents great difficulty in communicating with the missing people due to the difficulty of identifying them.Therefore, the proposed system aims to develop a smart model using Blockchain Technologies in order to match the DNA data of the missing persons and publish them on the smart system in a secure, non-distortionable, and decentralized manner, which allows the possibility of communication for the missing regardless of the location and in a more secure and reliable manner.
            </div>
            <div className="col-6 story">
              <img src={story} alt="story" />
            </div>
          </div>
        </div>
        
    </div> */}

<div className="ourstory">
<h1>رحلتنا</h1>
  <div className="container storyParent">
   
    
    <p>
    بسبب انتشار ظاهرة الأطفال المفقودين وخاصة ظاهرة اختطاف الأطفال ، وكذلك ظاهرة فقدان الأشخاص المصابين بأمراض نفسية وكبار السن وخاصة المصابين بمرض الزهايمر مما يمثل صعوبة كبيرة في التواصل مع المفقودين بسبب لصعوبة التعرف عليهم
</p>
 
<div className="imgdiv">
    <img src={story} alt="story" />
    </div>
  </div>

</div>

<div class="Row firstRow">
        <h1>فريق العمل</h1>
      </div>
      <div class="Row">
    
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={drahmed} alt="drahmed"/>
            </div>
            <h3>Dr.Ahmed Salama</h3>
            <p>Supervisor</p>
            <p>Executive Manager for the project of developing university's network infrastructure</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        </div>
    
    <section>
      <div class="Row ">
      </div>
      <div class="Row">
    
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={sara} alt="sara"/>
            </div>
            <h3>Sara Gamal</h3>
            <p className="role">Web3 developer</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      
      
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={samah}alt="samah" />
            </div>
            <h3>Samah abd Elghaffar</h3>
            <p className="role">Full stack developer</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
       
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={dalia} alt="dalia" />
            </div>
            <h3>Dalia Mohamed</h3>
            <p>Team Leader</p>
            <p className="role">Blockchain developer</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>





    <section>
     
      <div class="Row">
    
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={mysoon} alt="drahmed"/>
            </div>
            <h3 >Maysoon Mohamed</h3>
            <p className="role">Data Scientist</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      
      
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={reem}alt="samah" />
            </div>
            <h3>Reem Moaud</h3>
            <p className="role">UI/UX designer</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
       
        <div class="column">
          <div class="Card">
            <div class="img-container">
              <img src={mahy} alt="dalia" />
            </div>
            <h3>Mahetab Mohamed</h3>
            <p className="role">System analyst</p>
            <div class="icons">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-github"></i>
              </a>
              <a href="#">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>






<AddMessage/>




 

























<footer>
  <div>
  <span>الشركاء</span>
    <span>رحلتنا</span>
    <span>فريق العمل</span>
    
    <span>الصفحه الرئيسة</span>
    <span>كيف يعمل</span>
  </div>
 
  <div className="Desc">
  نموذج ذكي يستخدم تقنيات Blockchain لمطابقة بيانات الحمض النووي للمفقودين ونشرها على النظام الذكي بطريقة آمنة وغير قابلة للتشويه ولا مركزية
  </div>


</footer>




        </>
        
     
    );
  }
  
  export default Home;