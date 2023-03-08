const mongoose = require('mongoose');
require('dotenv/config')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
module.exports= {connectDB};