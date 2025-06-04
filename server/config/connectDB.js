const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
