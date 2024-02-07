const express = require("express");
require('dotenv').config()

const app = express();

const port = process.env.PORT || 3000;

// console.log(process.env)



app.get("/", (req, res) => {
  res.status(200).send("Hello World!!");
});

app.listen(port, () => console.log(`Server is up and running ${port}`));
