const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the user model
const UserSchema = new Schema({
  // The name field is required and must be a string
  name:{
    type:String,
    required:true
  },
  // The email field is required and must be a string and unique
  email:{
    type:String,
    required:true,
    unique:true
  },
  // The password field is required and must be a string
  password:{
    type:String,
    required:true
  },
  typeUser:{
    type:String,
    required:true
  },
  // The date field is optional and will be set to the current date if not provided
  date:{
    type:String,
    default: () => new Date().toLocaleDateString() 
  }
});

// Create the user model using the UserSchema schema
const UserModel = mongoose.model('user', UserSchema);

// Export the model so it can be used in other parts of the application
module.exports = UserModel;
