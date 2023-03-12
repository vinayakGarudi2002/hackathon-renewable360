import React from "react";
import ConsumerForm from "./ConsumerForm";
import Notes from "./Notes";


const Home = () => {


  return (
    <div className={" homepage container my-3"} style={{
      
    position: "relative",
    bottom:"74px"
    }}>
 
  <div className="homepageText" >Getting Started With Clean Energy</div>
 {/* <Notes/> */}
{/* <ConsumerForm/> */}
    </div>
  );
};

export default Home;
