import React from 'react'
import { useNavigate } from "react-router-dom";
const ChoiceYourTech = () => {
  let navigate = useNavigate();

  return (
    <div class="flex-container">

      <div  className='box' onClick={()=>{
 navigate("/solar")
      }}>
        <div className="title" >
          <h1>Solar</h1>
        </div>

        <div className="data">
          <h4>Minimum Setup Cost : Rs 50000  </h4>
          <h4>Maximum Energy Saving Setup  : 500kWh </h4>
        </div>
      </div>

      <div className='box'>
        <div className="title">
          <h1>Biogas</h1>
        </div>

        <div className="data">
          <h4>Minimum Setup Cost : 70000</h4>
          <h4>Maximum Energy Saving Setup  :700kWh </h4>
        </div>
      </div>

      <div className='box'>
        <div className="title">
          <h1>Solar & Biogas</h1>
        </div>

        <div className="data">
          <h4>Minimum Setup Cost :100000 </h4>
          <h4>Maximum Energy Saving Setup  :1000kWh </h4>
        </div>
      </div>

    </div>

  )
}

export default ChoiceYourTech
