const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString() 
  },
});

module.exports = mongoose.model("notes", NoteSchema);
