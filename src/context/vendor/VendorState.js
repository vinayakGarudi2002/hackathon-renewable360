import vendorcontext from "./vendorcontext";
// import { alertContext } from "../Alert/AlertContext"; // Alert

const VendorState = (props) => {

  // const alertcontext = useContext(alertContext);   // alert

  const host = "http://localhost:5000";


  const addData = async (addingData) => {
    const {type_of_source, service_location, subsidy_scheme, subsidy_percentage, industry_certification_name, industry_certification_no, cost_per_unit_of_clean_energy_setup, product_photo} = addingData;

    try {
      const response = await fetch(`${host}/api/vendor/vendordata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
          "auth-token":
            localStorage.getItem('token'),
        },

        body: JSON.stringify( {  type_of_source, service_location, subsidy_scheme, subsidy_percentage, industry_certification_name, industry_certification_no, cost_per_unit_of_clean_energy_setup,product_photo
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
     
        return true;
      } else {
        console.log("false")

        return false;
      }
    } catch (err) {
      console.log("err")

      console.error(err);

      return false;
    }
  };
 
  return (
    <vendorcontext.Provider
      value={{addData}}
    >
      {props.children}
    </vendorcontext.Provider>
  );
};

export default VendorState;
