require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/Connection");

const cors = require("cors");
const router = require("./routes/router");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
  app.use(router);

app.get("/",(req,res)=>{
    res.json("server start")
})

app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});