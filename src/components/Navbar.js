import React ,{useContext} from 'react'
import { useNavigate } from "react-router-dom";
import {  Link,useLocation } from "react-router-dom";
import { bgContext } from '../context/Bg';

const Navbar = (props) => {
  const {bgColor,toSetBgColor}=useContext(bgContext);

  const location=useLocation();
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  // useEffect(()=>{
  //   console.log(location.pathname)
  // },[location])
console.log(bgColor.nav)
const handleBackgroundColor=()=>{
  bgColor.nav==="black"? props.setBcolor("rgb(202 62 241)") : props.setBcolor("black") 
  bgColor.nav==="black"? toSetBgColor({
   nav:"#d43bff",
form:"#f8dfff",
cardTag:"rgb(212 69 255)",
cardBody:"rgb(222 109 255)",
cardEdit:"none",
modalBody:"rgb(202 62 241)",
formText:"6px 3px #eb94eb",
formBox:"12px 12px 2px 2px rgb(202 0 237 / 55%)",
formBack:"linear-gradient(12deg,#c914ff,#dd6aff)",
mode:"Enable Dark mode"
}) : toSetBgColor({
nav:"black",
form:"white",
cardTag:"black",
cardBody:"black",
cardEdit:"white",
modalBody:"#2c2c2c",
formText:"6px 3px rgb(92 86 86)",
formBox:"rgb(42 38 42 / 55%) 12px 12px 2px 2px",
formBack:"linear-gradient(12deg, black, black)",
mode:"Disable Dark mode"
}) 
}
  return (
   <>
<div className="bg"></div>
<nav className="navbar navbar-expand-lg navbar-dark  navigation-bar min-vw-100 " style={{
  background:`${bgColor.nav}`
}}>
  <div className="container-fluid">
   <Link className="navbar-brand" to="/">Renwable360</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
         <Link className={`nav-link ${location.pathname==="/"?"active":""} `}  aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
         <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
       
     
      </ul>
      
      {
        !localStorage.getItem('token')? <span><Link className="btn btn-sm nav-btn"  to="/login" role="button" style={{ boxShadow: `${location.pathname==="/login"?"3px 3px rgb(240 155 237)":""}`,marginLeft: "-4px"}}>Login</Link>
      <Link className="btn   btn-sm nav-btn" to="/signup" role="button"style={{ boxShadow: `${location.pathname==="/signup"?"3px 3px rgb(240 155 237)":""}`,marginLeft:"10px"}}>Sign up</Link></span>: <button className={"btn  btn-sm nav-btn"} onClick={handleLogout} style={{ boxShadow: `${location.pathname==="/logout"?"3px 3px rgb(240 155 237)":""}`,
     marginLeft: "-4px" }}>Logout</button>
      }
      <button className={"btn mx-2 btn-sm nav-btn"} onClick={()=>{
       handleBackgroundColor()
           
      }}>{bgColor.mode}</button>
    </div>
  </div>
</nav>

   </>
  )
}

export default Navbar