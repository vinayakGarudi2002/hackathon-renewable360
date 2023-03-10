const mongoose = require('mongoose');
const { Schema } = mongoose;


const EnergySourceSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  
  type_of_source:{
    type:String,
    required:true
  },
});

// Create the user model using the UserSchema schema
EnergySourceModel = mongoose.model('energy_source', EnergySourceSchema);

// Export the model so it can be used in other parts of the application
module.exports = EnergySourceModel;
