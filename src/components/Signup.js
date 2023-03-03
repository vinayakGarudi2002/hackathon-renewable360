import React, { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { alertContext } from "../context/Alert/AlertContext";  //----alert
import { bgContext } from '../context/Bg';

import "./Style.css"
const Signup = () => {
const {toSetAlerts}=useContext(alertContext);   // ----alert
const {bgColor}=useContext(bgContext);

  let navigate = useNavigate();
  const host = "http://localhost:5000"
  // const [ typeUser , setTypeUser]=useState("")
  const [loginForm, setLoginForm] = useState({
    name: "",
    email: "",
    cpassword: "",
    password:"",
    typeUser:""
   
  });

  // const [password,setPassword]=useState("");

  const loginFormChange = (e) => {
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: [e.target.value].toString(),
       
      };
    });
  };

  const handleSubmit= async (e)=>{
    e.preventDefault();
   const {email,password,name,typeUser}=loginForm;
    if((loginForm.cpassword)===loginForm.password){
      try {
        const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
         
          },
          body: JSON.stringify({email,password,name,typeUser})
        });
        const data = await response.json();
        if (response.status === 200) {
  
         localStorage.setItem("token",data.authtoken);
         navigate(`/consumerform`);
         toSetAlerts("visible","Success fully signup","success")    //...alert

         return;
          
        }else{
          toSetAlerts("visible","Enter Valid Credentials","warning")    //...alert
        }
        
  
        } catch (err) {
            // alert("Enter Valid Credentials error")
         toSetAlerts("visible","Some Error ocurred try letter","danger")    //...alert

        console.error(err);
        }
    }else{
      toSetAlerts("visible","password not match","warning")    //...alert

    }

  }
  return (
    <div className={"container signUp-container  "} >
    <h1 className={"text-center my-2 login_signupForm"} style={{textShadow:`${bgColor.formText}`}}>Sign Up</h1>
     <div className="form-signUp my-2" style={{backgroundImage:`${bgColor.formBack}`,
     boxShadow:`${bgColor.formBox}`}}>
     <form onSubmit={(e)=>{
            handleSubmit(e)
        }}>
        <div className="mb-1">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
           minLength={3} required
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            value={loginForm.name}
            onChange={(e) => {
              loginFormChange(e);
            }}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
          required
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            value={loginForm.email}
            onChange={(e) => {
              loginFormChange(e);
            }}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            minLength={8} required
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={loginForm.password}
            onChange={(e) => {
              loginFormChange(e);
            }}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="cpassword" className="form-label">
           Confirm Password
          </label>
          <input
           minLength={8} required
          disabled={loginForm.password.length<8}
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            value={loginForm.cpassword}
            onChange={(e) => {
              loginFormChange(e);
            }}
          />
        </div>
        <div>
        <div className="signup-type">Type of User</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="typeUser" id="typeUser"   value={"vendor"}
            onClick={(e) => {
              loginFormChange(e);
            }}/>
  <label className="form-check-label" for="flexRadioDefault1">
    Vendor
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="typeUser" id="typeUser"   value={"consumer"}
            onClick={(e) => {
              loginFormChange(e);
            }}/>
  <label className="form-check-label" for="flexRadioDefault2">
    Consumer
  </label>
</div>
        </div>
        {/* <div className="mb-1 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn form-btn" >
          Submit
        </button>
      </form>
     </div>
    </div>
  );
};

export default Signup;
