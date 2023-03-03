const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Note");
const { check, validationResult } = require("express-validator");

//Router 1:Get All notes of particular user (using id) : Get : localhost:5000/api/notes/fetchnotes (Login required)

router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const data = await Notes.find({ user: req.user.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Internal error ocurred");
    console.log(err);
  }
});

//Router 2:Add notes (using id) : Get : localhost:5000/api/notes/addnote (Login required)
router.post(
  "/addnote",
  fetchUser,
  [
    check("title", "Enter Valid Title at least 1 character").isLength({
      min: 1,
    }),
    check(
      "description",
      "Enter Valid Description at least 5 character"
    ).isLength({ min: 5 }),
    check(
      "tag",
      "Enter Valid tag at least 1 character"
    ).isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a response with a status code of 400 (Bad Request) and the errors array
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    console.log(req.body);

    try {
      const userid = req.user.id;
      const date = new Date().toLocaleDateString();

      const note = new Notes({
        title,
        description,
        tag,
        user: userid,
        date,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      res.status(500).send("Internal error ocurred");
      console.log(err);
    }
  }
);
// add coments
//Router 3:Update notes (using id) : Put : localhost:5000/api/notes/updatenote (Login required)

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  // Set newnote object
  const newnote = {};
  const { tag, title, description } = req.body;

  // Update newnote object with provided fields
  if (tag) {
    newnote.tag = tag;
  }
  if (description) {
    newnote.description = description;
  }
  if (title) {
    newnote.title = title;
  }

  // Try to update the note with the provided data
  try {
    // Find the note by id
    const noteToUpdate = await Notes.findOne({ _id: req.params.id });
    console.log(noteToUpdate);
    // If the note is not found, return a 404 error
    if (!noteToUpdate) {
      return res.status(404).send("Page Not Found");
    }
    // If the note belongs to a different user, return a 401 error
    if (noteToUpdate.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // Update the note and return the updated version
    const updateNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(updateNote);
  } catch (error) {
    // If there is an error, return a 500 error
    res.status(500).send("Internal Error Occurred");
    console.log(error.message);
  }
});

//Router 4:Delete notes (using id) : Delete : localhost:5000/api/notes/deletenote (Login required)
router.delete("/deletenote/:id", fetchUser, async (req, res) => {


  
  try {
    // Find the note by id
    const noteToDelete = await Notes.findOne({ _id: req.params.id });
    // console.log(noteToDelete);
    
    // If the note is not found, return a 404 error
    if (!noteToDelete) {
      return res.status(404).send("Page Not Found");
    }
    // If the note belongs to a different user, return a 401 error
    if (noteToDelete.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // Note to be delete
    const deletedNote = await Notes.findByIdAndDelete(
      req.params.id
    );
    res.json({"Success":"Note Deleted successfully",
      deletedNote});
  } catch (error) {
    // If there is an error, return a 500 error
    res.status(500).send("Internal Error Occurred");
    console.log(error.message);
  }
});
module.exports = router;

// add coments
