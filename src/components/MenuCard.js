import React from "react";

const MenuCard = ({ menuData }) => {
  //   console.log(menuData);

  return (
    <>
      <section className="main-card--cointainer">
        {menuData.map((curElem) => {
          const { id, name, price, image,Industry_Certification,Subscidy_Available,Contact_Details, description } = curElem;

          return (
            <>
              <div className="card-container" key={id}>
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">{id}</span>
                    <h2 className="card-title"> {name} </h2>
                    <span className="card-description subtle">
                      {description}
                    </span>
                    <div className="card-read">Read</div>
                    <span className="card-author subtle">Price: {price}</span>
                    <span className="card-author subtle">Industries Certification: {Industry_Certification}</span>
                    <span className="card-author subtle">Subcidy: {Subscidy_Available}</span>
                    <span className="card-author subtle">Contact Detail: {Contact_Details}</span>

                  </div>
                  <img src={image} alt="images" className="card-media" />

                  <span className="card-tag  subtle">Order Now</span>
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