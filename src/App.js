// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/Note/NoteState";
import Alert from "./components/Alert";
import AlertContext from "./context/Alert/AlertContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import BgContext from "./context/Bg";
import { useContext, useEffect, useState } from "react";
import ConsumerState from "./context/consumer/ConsumerState";
import ConsumerForm from "./components/ConsumerForm";
import UserState from "./context/User/UserState";
import Addproduct from "./components/Addproduct";
import VendorState from "./context/vendor/VendorState";
import EnergySource from "./components/EnergySource";
import Solar from "./components/Solar";
// import setBodyColor from './setBodyColor'

function App() {
  const [bcolor, setBcolor] = useState("rgb(202 62 241)");
  const element = document.querySelector("body");
  function changeBgColor(color) {
    element.style.setProperty("background-color", color);
  }
  useEffect(() => {
    console.log(bcolor);
    changeBgColor(bcolor);
    console.log("ok");
  }, [bcolor]);

  return (
    <UserState>
    <VendorState>
        <ConsumerState>
          <NoteState>
            <AlertContext>
              <BgContext>
                <div className="App  ">
                  <Router>
                    <div className="header">
                      <Navbar setBcolor={setBcolor} />
                      {/* <div className="section-home"> */}
                      <Alert />
                    </div>

                    <Routes>
                      <Route
                        exact
                        path="/"
                        element={
                          <div className=" ">
                            <Home />
                          </div>
                        }
                      />
                      <Route path="/about" element={<About />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/consumerform" element={<ConsumerForm />} />
                      <Route path="/addproduct" element={<Addproduct />} />
                      <Route path="/energysources" element={<EnergySource />} />
                      <Route path="/solar" element={<Solar />} />
                    </Routes>
                    {/* </div> */}
                  </Router>
                </div>
              </BgContext>
            </AlertContext>
          </NoteState>
        </ConsumerState>
    </VendorState>
      </UserState>
  );
}

export default App;
