const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/"

mongoose.set('strictQuery', true);

const connectToMongo = ()=>{
        mongoose.connect(url,()=>{
            console.log("MongoDB Connected")
        })
        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB is connected');
          } else {
            console.log('MongoDB is not connected');
          }
          mongoose.connection.on('error', (error) => {
            console.error(`MongoDB connection error: ${error}`);
          });
}
module.exports=connectToMongo