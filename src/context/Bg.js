import React ,{ createContext,useState } from "react";

const bgContext = createContext();

const BgContext = (props) => {
    const [bgColor,setBgColor]=useState({
      nav:"#d43bff",
      form:"#f8dfff",
      cardTag:"rgb(212 69 255)",
      cardBody:"rgb(222 109 255)",
      modalBody:"rgb(202 62 241)",
      cardEdit:"none",
      formText:"6px 3px #eb94eb",
      formBox:"12px 12px 2px 2px rgb(202 0 237 / 55%)",
      formBack:"linear-gradient(12deg,#c914ff,#dd6aff)",
      mode:"Enable Dark mode"

    });
const toSetBgColor=(color)=>{
  setBgColor( color
   )
  
}
  return (
    <bgContext.Provider value={{ bgColor,toSetBgColor}}>
      {props.children}
    </bgContext.Provider>
  )
}



export default BgContext;
export {bgContext}
