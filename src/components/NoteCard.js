import React, { useState, useContext } from "react";
import notecontext from "../context/Note/notecontext";
import { alertContext } from "../context/Alert/AlertContext"; //----alert
import { bgContext } from '../context/Bg';

import "./Style.css";
const NoteCard = (props) => {
  const { tag, title, description, _id } = props.note;
  const [isShown, setIsShown] = useState("hidden");
  const { deleteNote } = useContext(notecontext);
  const { toSetAlerts } = useContext(alertContext); // ----alert
  const {bgColor}=useContext(bgContext);
 
  const deleteMyNote= async ()=>{
    const status= await deleteNote(_id);
    if (status) {
      toSetAlerts(
        "visible",
        "Success fully Note Deleted",
        "success"
      ); //...alert
    } else {
      toSetAlerts("visible", "Some Error Ocurred Try Later", "danger"); //...alert
    }
  }
  return (
    <div className="col-md-3">
      <div
        className="card my-3"
        onMouseEnter={() => setIsShown("visible")}
        onMouseLeave={() => setIsShown("hidden")}
      >
        <div className="card-header fw-bold text-light card-header" style={{background:`${bgColor.cardTag}`,
        borderBottom:"1px solid white"
       
        }}>{tag}</div>
        <div className="card-body text-light card-body" style={{background:`${bgColor.cardBody}`
        }}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}

          <div
            className=" my-0"
            style={{
              display: "flex",
              visibility: `${isShown}`,
              flexDirection: "row-reverse",
            }}
          >
            <i
              className="fa-regular fa-trash-can mx-2 deleteIcon"
              onClick={() => {
                deleteMyNote()
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-2 editIcon" style={{color:bgColor.cardEdit}}
              onClick={() => {
                props.openUpdateNoteForm(props.note);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
