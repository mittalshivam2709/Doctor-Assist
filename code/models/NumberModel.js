const mongoose = require('mongoose');

// Define the schema
const NumberListSchema = new mongoose.Schema({
  numbers: {
    type: [Number], 
    required: true 
  }
}, { timestamps: true }); 

const NumberList = mongoose.model('NumberList', NumberListSchema);

module.exports = NumberList;
