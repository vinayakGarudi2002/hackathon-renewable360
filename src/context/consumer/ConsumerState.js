import consumercontext from "./consumercontext";
// import { alertContext } from "../Alert/AlertContext"; // Alert

const ConsumerState = (props) => {

  // const alertcontext = useContext(alertContext);   // alert

  const host = "http://localhost:5000";


  const addData = async (addingData) => {
    const {type_of_organisation,location,area_of_setup,bio_waste_generated,bio_waste_volume,energy_consumption} = addingData;

    try {
      const response = await fetch(`${host}/api/consumer/consumerdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({type_of_organisation,location,area_of_setup,bio_waste_generated,bio_waste_volume,energy_consumption}),
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
    <consumercontext.Provider
      value={{addData}}
    >
      {props.children}
    </consumercontext.Provider>
  );
};

export default ConsumerState;
