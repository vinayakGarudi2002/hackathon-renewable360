import React , {useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { alertContext } from "../context/Alert/AlertContext";  //----alert
import { bgContext } from '../context/Bg';
import usercontext from "../context/User/usercontext";


const Login = () => {
  const {toSetAlerts}=useContext(alertContext);   // ----alert
  const {bgColor}=useContext(bgContext);
  const { setTypeUser } = useContext(usercontext);
    const [loginForm, setLoginForm] = useState({
  
        email: "",
        password: "",
      });
      const host = "http://localhost:5000"
      const loginFormChange = (e) => {
        setLoginForm((prevState) => {
          return {
            ...prevState,
            [e.target.name]: [e.target.value].toString(),
          };
        });
      };
     
 let navigate = useNavigate();
    
      const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              mode: 'cors',
             
              },
              body: JSON.stringify(loginForm)
            });
            const data = await response.json();
            if (response.status === 200) {
      
             localStorage.setItem("token",data.authtoken);
             setTypeUser(data.typeUser)
             navigate(`/`);
         toSetAlerts("visible","Success fully Logged in","success")    //...alert

             return;
              
            }else{
              toSetAlerts("visible","Enter Valid Credentials","warning")    //...alert

                
            }
      
            } catch (err) {
         toSetAlerts("visible","Some Error ocurred try letter","danger")    //...alert

            console.error(err);
            }
      
      
      }

  return (
    <div className={"container signUp-container  "} >
    <h1 className={"text-center my-2 login_signupForm"} style={{textShadow:`${bgColor.formText}`}}>Login</h1>
     <div className="form-signUp my-2" style={{backgroundImage:`${bgColor.formBack}`,
     boxShadow:`${bgColor.formBox}`}}>
     <form>
       
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
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
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control "
            name="password"
            id="password"
            value={loginForm.password}
            onChange={(e) => {
              loginFormChange(e);
            }}

          />
        </div>
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn  form-btn" onClick={(e)=>{
            handleSubmit(e)
        }}>
          Submit
        </button>
      </form>
     </div>
    </div>
  )
}

export default Login