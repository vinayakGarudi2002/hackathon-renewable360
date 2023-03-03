import React, {useState,useContext} from "react";
import notecontext from "../context/Note/notecontext";
import { alertContext } from "../context/Alert/AlertContext";  //----alert
import { bgContext } from '../context/Bg';

const AddNotes = () => {
const {addNote}=useContext(notecontext);
const {toSetAlerts}=useContext(alertContext);   // ----alert

const {bgColor}=useContext(bgContext);



  // handling note form
  const [updateNote, setUpdateNote] = useState({
    title: "",
    description: "",
    tag:"General"
  });
  // updating form
  const update = (e) => {
    setUpdateNote((prevNote) => {
      return {
        ...prevNote,
        [e.target.name]: [e.target.value].toString()
      };
    });
  };

const handleSubmit=async (e)=>{
e.preventDefault();
const status= await addNote(updateNote);
setUpdateNote({
  title: "",
  description: "",
  tag:"General"
})

if(status){
  console.log(status)
  toSetAlerts("visible","Note Added Success Fully","success")    //...alert
}else{
  toSetAlerts("visible","Some Error Ocurred Try Later","danger")    //...alert
}

}

  return (
    <div className="container my-2" >
      <h2 style={{
        color:"white",
        fontWeight: "bold"
      }}>Add Note</h2>
      <form className="my-3 text-light text-bold fw-bold" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
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
            minLength={1} required
            style={{background:bgColor.form}}
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
            minLength={3} required
            style={{background:bgColor.form}}

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
            minLength={1} required
            style={{background:bgColor.form}}

          />
        </div>
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button  type="submit" className="btn form-btn sub-btn" >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
