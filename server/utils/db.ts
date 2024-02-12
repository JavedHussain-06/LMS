import mongoose from "mongoose";
require("dotenv").config();

const dburl: string = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    mongoose.connect(dburl).then((data: any) => {
      console.log(
        `Database connected successfully!!😊`
      );
    });
  } catch (err) {
    console.log(err)
    setTimeout(connectDB, 5000);
  }
};
export default connectDB;
