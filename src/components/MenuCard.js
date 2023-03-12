import React from "react";

const MenuCard = ({ menuData }) => {
  //   console.log(menuData);

  return (
    <>
      <section className="main-card--cointainer">
        {menuData.map((curElem) => {
          const {id, name,image, contact_details,type_of_source, service_location, subsidy_scheme, subsidy_percentage, industry_certification_name, industry_certification_no, cost_per_unit
    } = curElem;

          return (
            <>
              <div className="card-container" key={id}>
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">{id}</span>
                    <h2 className="card-title"> {name} </h2>
                    {/* <span className="card-description subtle">
                      {description}
                    </span> */}
                    <div className="card-read">Read</div>
                    <span className="card-author subtle">Cost perUnit: {cost_per_unit}</span>
                    <span className="card-author subtle">Industries Certification: {industry_certification_no}</span>
                    <span className="card-author subtle">subcidy scheme: {subsidy_scheme}</span>
                    <span className="card-author subtle">Contact Detail: {contact_details}</span>

                  </div>
                  <img src={image} alt="images" className="card-media" />

                  <span className="card-tag  subtle">Request Call</span>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default MenuCard;