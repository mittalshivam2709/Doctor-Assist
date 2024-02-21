const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config')
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello world');
});
const PORT = process.env.PORT || 3000; 

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
    const collections = await mongoose.connection.db.collections();
    console.log("Collections in the database:");
    console.log(mongoose.connection.db);
    collections.forEach(collection => {
      console.log(mongoose.connection.db);
    });
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${PORT}`);
}); 