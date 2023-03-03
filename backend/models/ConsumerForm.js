const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the user model
const ConsumerFormSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  // The type_of_organisation field is required and must be a string
  type_of_organisation:{
    type:String,
    required:true
  },
  // location where Clean Energy is to be setup
  location:{
    type:String,
    required:true
  },
  // area_of_setup is the area reserved/ available for setup equipment of clean energy 
  area_of_setup:{
    type:String,
    required:true
  },
  // bio_waste_volume in m^3 
  bio_waste_volume:{
    type:Number,
    default:0
  },
  // energy_consumption monthly in units (kW/hr)
  energy_consumption:{
    type:Number,
    required:true 
  },


});

// Create the user model using the UserSchema schema
const ConsumerFormModel = mongoose.model('consumer_form', ConsumerFormSchema);

// Export the model so it can be used in other parts of the application
module.exports = ConsumerFormModel;
