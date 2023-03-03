import React, { useContext, useEffect, useRef, useState } from "react";
import notecontext from "../context/Note/notecontext";
import NoteCard from "./NoteCard";
import AddNotes from "./AddNotes";
import { alertContext } from "../context/Alert/AlertContext";  //----alert
import { useNavigate } from "react-router-dom";
import { bgContext } from '../context/Bg';


const Notes = () => {
  const [toUpdate,setToUpdate]=useState(false)
  const {toSetAlerts}=useContext(alertContext);   // ----alert

const {bgColor}=useContext(bgContext);

  const [updateNote, setUpdateNote] = useState({
    title: "",
    description: "",
    tag:"",
    _id:""
  });




  // using notecontext to display notes
  const context = useContext(notecontext);
  const { note, getNote ,updateMyNote} = context;
  let navigate = useNavigate();
  const fetchData= async ()=>{
    if(localStorage.getItem('token')){
      const status = await getNote()
      if(status){
      console.log("login "+status)
      }else{
      toSetAlerts("visible","Some Error Ocurred Try Later","danger")    //...alert
      }
    }else{
      navigate("/login")
      toSetAlerts("visible","Login First","warning")    //...alert
    }
    
  }

  useEffect( () => {

    fetchData()

    // console.log("hit")
    //eslint-disable-next-line
  }, []);



  const ref = useRef(null);

  const openUpdateNoteForm = (note) => {
    ref.current.click();
    // console.log(note)
    const { tag, description, title,_id } = note;
    setUpdateNote({tag, description, title,_id} );
    

  };

  // handling note form

  // updating form
  const update = (e) => {
    setUpdateNote((prevNote) => {
      return {
        ...prevNote,
        [e.target.name]: [e.target.value].toString(),
      };
    });
    setToUpdate(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(toUpdate){
      const status  =await updateMyNote(updateNote)
      if(status){
        toSetAlerts("visible","Success fully Note Updated","success")    //...alert

      }else{
      toSetAlerts("visible","Some Error Ocurred Try Later","danger")    //...alert
        
      }
    // }
    
  };

  return (
    <div className={""}  >
      <AddNotes />

      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{color:"white"}}
      >
        <div className="modal-dialog ">
          <div className="modal-content " style={{background: bgColor.modalBody}}>
            <div className="modal-header " style={{background: bgColor.modalBody}}>
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label" >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      update(e);
                    }}
                    value={updateNote.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={(e) => {
                      update(e);
                    }}
                    value={updateNote.description}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={(e) => {
                      update(e);
                    }}
                    value={updateNote.tag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn form-btn sub-btn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled={updateNote.description.length<5 || updateNote.title.length<1 || updateNote.tag.length<1|| !toUpdate}   className="btn  form-btn sub-btn" data-bs-dismiss="modal" onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <h2 style={{
        fontWeight: "bold",
        color: "white"
      }}>Your Notes</h2>
        {note.map((note, index) => {
          return (
            <NoteCard
              key={index}
              note={note}
              openUpdateNoteForm={openUpdateNoteForm}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
