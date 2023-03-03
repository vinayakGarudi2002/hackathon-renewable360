import { useState } from "react";
import notecontext from "./notecontext";
// import { alertContext } from "../Alert/AlertContext"; // Alert

const NoteState = (props) => {
  
  const initialNote = [];
  const [note, setNote] = useState(initialNote);

  // const alertcontext = useContext(alertContext);   // alert

  const host = "http://localhost:5000";

  //fetch notes -- url and token
  const getNote = async () => {
    console.log("triger");
    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log("ff - triger");
        setNote(data);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);

      return false;
    }
  };

  // addingNote token , url , data
  const addNote = async (addingNote) => {
    const { tag, description, title } = addingNote;

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ tag, description, title }),
      });
      const data = await response.json();
      if (response.status === 200) {
        const newnote = data;
        setNote(note.concat(newnote));
        // console.log("i going in ")
        // console.log(alertcontext)
        // if (alertcontext) {
        //   console.log("i am in ")
        //   const {toSetAlerts} = alertcontext;
        //   toSetAlerts("visible","Note Added Success Fully","success")
        // }
        console.log("seting")
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
  // delete note - id , token , url
  const deleteNote = async (id) => {
    // console.log(id);
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      // const data = await response.json();

      if (response.status === 200) {
        const newnote = note.filter((note) => {
          return note._id !== id;
        });
        setNote(newnote);
        return true
      }else{
      return false}
    } catch (err) {
      console.error(err);
      return false
    }
  };
  // updateMyNote - id , token , url , data
  const updateMyNote = async (data) => {
    // console.log(data)
    const { tag, description, title, _id } = data;

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ tag, description, title }),
      });
      // const data = await response.json();
      const json = await response.json();
      console.log(json);
      console.log(note);
      let newNotes = JSON.parse(JSON.stringify(note)); //   let newNotes=note //not worked // 2-3 hr
      console.log(newNotes);
      // Logic to edit in client
      for (let i of newNotes) {
        if (i._id === _id) {
          i.title = title;
          i.tag = tag;
          i.description = description;
          break;
        }
      }
      setNote(newNotes);
      return true
      // setNote(newNotes);
    } catch (err) {
      console.log(err)
      return false

    }
  };

  return (
    <notecontext.Provider
      value={{ note, addNote, deleteNote, getNote, updateMyNote }}
    >
      {props.children}
    </notecontext.Provider>
  );
};

export default NoteState;
