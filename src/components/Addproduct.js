import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { alertContext } from "../context/Alert/AlertContext"; //----alert
import { bgContext } from "../context/Bg";
import vendorcontext from "../context/my_vendor/vendorcontext";
import "./Style.css";


const Addproduct = () => {

  const addData = async (addingData) => {
    const {type_of_source, service_location, subsidy_scheme, subsidy_percentage, industry_certification_name, industry_certification_no,cost_per_unit_of_clean_energy_setup} = addingData;

    try {
      const response = await fetch(`${host}/api/vendor/vendordata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
          "auth-token":
            localStorage.getItem('token'),
        },

        body: JSON.stringify( {  type_of_source, service_location, subsidy_scheme, subsidy_percentage, industry_certification_name, industry_certification_no, cost_per_unit_of_clean_energy_setup
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
  const { toSetAlerts } = useContext(alertContext); // ----alert
  const { bgColor } = useContext(bgContext);
  // const { addData } = useContext(vendorcontext);

  let navigate = useNavigate();
  const host = "http://localhost:5000";
  // const [ typeUser , setTypeUser]=useState("")
  const [ProductForm, setProductForm] = useState({
    type_of_source: "",
    service_location: "",
    subsidy_scheme: "",
    subsidy_percentage: "0",
    industry_certification_name: "",
    industry_certification_no: "",
    cost_per_unit_of_clean_energy_setup: "",
  });

  // const [password,setPassword]=useState("");

  const ProductFormChange = (e) => {
    setProductForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: [e.target.value].toString(),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await addData(ProductForm);

    if (status) {
      navigate(`/`);

      console.log(status);
      toSetAlerts("visible", "Data Added Success Fully", "success"); //...alert
    } else {
      toSetAlerts("visible", "Some Error Ocurred Try Later", "danger"); //...alert
    }
  };

  return (
    <div className={"container signUp-container  "}>
      <h1
        className={"text-center my-2 login_signupForm"}
        style={{ textShadow: `${bgColor.formText}` }}
      >
        Add Product
      </h1>
      <div
        className="form-signUp my-2"
        style={{
          backgroundImage: `${bgColor.formBack}`,
          boxShadow: `${bgColor.formBox}`,
        }}
      >
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-1">
            <label htmlFor="type_of_organisation" className="form-label">
              Type of Source
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="type_of_source"
              onChange={(e) => {
                ProductFormChange(e);
              }}
            >
              <option selected>Select Type of Source</option>
              <option value="Home">Solar</option>
              <option value="Shop">Bio</option>
              <option value="Shop">Solar Monocrystalline</option>
              <option value="Shop">Solar Polycrystalline</option>
              <option value="Shop">Solar Thinfilm</option>
            </select>
          </div>

          <div className="mb-1">
            <label htmlFor="location" className="form-label">
              Service Location
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="service_location"
              onChange={(e) => {
                ProductFormChange(e);
              }}
            >
              <option selected>Select Your Location</option>
              <option value="Mumbai">Latur</option>
              <option value="Kolkata2">Aurangaba</option>
              <option value="Delhi">Nashik</option>y
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="location" className="form-label">
              Subcidy Scheme
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="subsidy_scheme"
              id="subsidy_scheme"
              aria-describedby="emailHelp"
              placeholder=""
              value={ProductForm.subsidy_scheme}
              onChange={(e) => {
                ProductFormChange(e);
              }}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="location" className="form-label">
              Subcidy Percentage
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="subsidy_percentage"
              id="subsidy_percentage"
              aria-describedby="emailHelp"
              placeholder=""
              value={ProductForm.subsidy_percentage}
              onChange={(e) => {
                ProductFormChange(e);
              }}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="location" className="form-label">
              Industries Certificate Name
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="industry_certification_name"
              id="industry_certification_name"
              aria-describedby="emailHelp"
              placeholder=""
              value={ProductForm.industry_certification_name}
              onChange={(e) => {
                ProductFormChange(e);
              }}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="location" className="form-label">
              Industries Certificate Number
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="industry_certification_no"
              id="industry_certification_no"
              aria-describedby="emailHelp"
              placeholder=""
              value={ProductForm.industry_certification_no}
              onChange={(e) => {
                ProductFormChange(e);
              }}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="location" className="form-label">
              Cost Per Unit of Clean Energy Setup
            </label>
            <input
              required
              type="text"
              className="form-control"
              name="cost_per_unit_of_clean_energy_setup"
              id="cost_per_unit_of_clean_energy_setup"
              aria-describedby="emailHelp"
              placeholder=""
              value={ProductForm.cost_per_unit_of_clean_energy_setup}
              onChange={(e) => {
                ProductFormChange(e);
              }}
            />
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
          <button type="submit" className="btn form-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
