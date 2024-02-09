import { app } from "./app";
import connectDB from "./utils/db";

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port", PORT);
  connectDB();
});
