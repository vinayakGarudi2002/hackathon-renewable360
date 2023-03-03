import React ,{ createContext,useState } from "react";

const alertContext = createContext();

const AlertContext = (props) => {
    const [alert,setAlert]=useState({
        display:"hidden",
        message:"Alert ",
        type:"success"
      });
const toSetAlerts=(display,msg,type)=>{
  setAlert(
    { display:display,
     message:msg,
     type:type}
   
     
   )
   setTimeout(() => {
     setAlert((prevState)=>{
          return {
              ...prevState,
              display:"hidden"
          }
      })
   }, 1200);
}
  return (
    <alertContext.Provider value={{ alert,toSetAlerts}}>
      {props.children}
    </alertContext.Provider>
  )
}



export default AlertContext;
export {alertContext}
