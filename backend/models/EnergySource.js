const mongoose = require('mongoose');
const { Schema } = mongoose;


const EnergySourceSchema = new Schema({

  type_of_source:{
    type:String,
    required:true
  },

  // energy_consumption monthly in units (kW/hr)
  customised_cost_solar:{
    type:Number,
    default:50000
  },
  customised_cost_bio:{
    type:Number,
    default: 70000
  },  
  customised_cost_solar_bio:{
    type:Number,
    default: 120000 
  },

});

// Create the user model using the UserSchema schema
EnergySourceModel = mongoose.model('energy_source', EnergySourceSchema);

// Export the model so it can be used in other parts of the application
module.exports = EnergySourceModel;
