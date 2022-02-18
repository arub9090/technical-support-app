const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const cnn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB has been Connected on host ${cnn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

exports.connectDB = connectDB;