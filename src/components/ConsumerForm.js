import React, { useState ,useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { alertContext } from "../context/Alert/AlertContext";  //----alert
import { bgContext } from '../context/Bg';
import consumercontext from "../context/consumer/consumercontext";
import "./Style.css"
const ConsumerForm = () => {
const {toSetAlerts}=useContext(alertContext);   // ----alert
const {bgColor}=useContext(bgContext);
const {addData}=useContext(consumercontext);


const [biostate , setBiostate]=useState(0);





  let navigate = useNavigate();
  const host = "http://localhost:5000"
  // const [ typeUser , setTypeUser]=useState("")
  const [EnergyForm, setEnergyForm] = useState({
    type_of_organisation:"",
    location:"",
    area_of_setup:"",
    bio_waste_volume:"0",
    energy_consumption:""
   
  });

  // const [password,setPassword]=useState("");

  const EnergyFormChange = (e) => {
    setEnergyForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: [e.target.value].toString(),
       
      };
    });
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const status= await addData(EnergyForm);
   
    
    if(status){
      navigate(`/`);
     
      console.log(status)
      toSetAlerts("visible","Data Added Success Fully","success")    //...alert
    }else{
      toSetAlerts("visible","Some Error Ocurred Try Later","danger")    //...alert
    }
    
    }
 


  return (
    <div className={"container signUp-container  "} >
    <h1 className={"text-center my-2 login_signupForm"} style={{textShadow:`${bgColor.formText}`}}>Energy Form</h1>
     <div className="form-signUp my-2" style={{backgroundImage:`${bgColor.formBack}`,
     boxShadow:`${bgColor.formBox}`}}>
     <form onSubmit={(e)=>{
            handleSubmit(e)
        }}>
    <div className="mb-1">
    <label htmlFor="type_of_organisation" className="form-label" >
          Type of Organization 
          </label>
          <select class="form-select" aria-label="Default select example"  name="type_of_organisation" onChange={(e) => {
              EnergyFormChange(e);
            }} >
  <option selected>Type of Organization</option>
  <option value="Home">Home</option>
  <option value="Shop">Shop</option>
  <option value="Hospital">Hospital</option>
</select>
    </div>

    <div className="mb-1">
    <label htmlFor="location" className="form-label">
          Location
          </label>
          <select class="form-select" aria-label="Default select example"  name="location" onChange={(e) => {
              EnergyFormChange(e);
            }} >
  <option selected>Select Your Location</option>
  <option value="Mumbai">Latur</option>
  <option value="Kolkata2">Aurangaba</option>
  <option value="Delhi">Nashik</option>y
</select>
    </div>
    <div className="mb-1">
          <label htmlFor="location" className="form-label">
          Area of Setup (sq. m.)
          </label>
          <input
          required
            type="text"
            className="form-control"
            name="area_of_setup"
            id="area_of_setup"
            aria-describedby="emailHelp"
            placeholder="Ex 2 sq. m."
            value={EnergyForm.area_of_setup}
            onChange={(e) => {
              EnergyFormChange(e);
            }}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="location" className="form-label">
          Energy Consumption (kW/Hr)
          </label>
          <input
          required
            type="text"
            className="form-control"
            name="energy_consumption"
            id="energy_consumption"
            aria-describedby="emailHelp"
            placeholder="Ex 12kW/Hr"
            value={EnergyForm.energy_consumption}
            onChange={(e) => {
              EnergyFormChange(e);
            }}
          />
        </div>
     
      
        <div>
        <div className="signup-type">Biodegradable Waste Available</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="typeUser" id="typeUser"   value={"true"}
            onClick={(e) => {
              setBiostate(1);
            }}/>
  <label className="form-check-label" for="flexRadioDefault1">
    yes
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="typeUser" id="typeUser"   value={"false"}
            onClick={(e) => {
              setBiostate(0);
            }}/>
  <label className="form-check-label" for="flexRadioDefault2">
    no
  </label>
</div>

<div className="degradableVolume">

{
  biostate ? <div className="mb-1">
          <label htmlFor="location" className="form-label">
          Bioderadable Volume (per/day- m. cube.)
          </label>
          <input
          required
            type="text"
            className="form-control"
            name="bio_waste_volume"
            id="bio_waste_volume"
            aria-describedby="emailHelp"
            placeholder="Ex 12"
            value={EnergyForm.bio_waste_volume}
            onChange={(e) => {
              EnergyFormChange(e);
            }}
          />
          
        </div> 
        
         : ""
}
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

export default ConsumerForm;;
