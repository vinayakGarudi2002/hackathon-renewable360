import { useState } from "react";
import usercontext from "./usercontext";
// import { alertContext } from "../Alert/AlertContext"; // Alert

const UserState = (props) => {

  const [data, setData]=useState()

  const[ typeUser , setTypeUser]=useState()
  // const alertcontext = useContext(alertContext);   // alert


  const host = "http://localhost:5000";

  //fetch notes -- url and token
  const getUser = async () => {
    console.log("triger");
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      const userdata = await response.json();
      if (response.status === 200) {
        setData(userdata)
      
        console.log(data)
        console.log("ff - triger");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);

      return false;
    }
  };



  return (
    <usercontext.Provider
      value={{ getUser , setData ,setTypeUser,typeUser }}
    >
      {props.children}
    </usercontext.Provider>
  );
};

export default UserState;
