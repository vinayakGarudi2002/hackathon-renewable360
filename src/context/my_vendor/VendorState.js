import vendorcontext from "./vendorcontext";
// import { alertContext } from "../Alert/AlertContext"; // Alert

const VendorState = (props) => {

  // const alertcontext = useContext(alertContext);   // alert

  const host = "http://localhost:5000";


  const putData = async (addingData) => {
 console.log(addingData)
  };
 
  return (
    <vendorcontext.Provider
      value={{putData}}
    >
      {props.children}
    </vendorcontext.Provider>
  );
};

export default VendorState;
