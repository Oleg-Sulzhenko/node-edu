const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('Mongo Connected :>> ');
  } catch(err) {
    console.log('Mongo err :>> ', err);
    process.exit(1);
  }
}

module.exports = connectDB;