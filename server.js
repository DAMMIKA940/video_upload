require("dotenv").config({ path: "./.env" });
const express = require("express");
const connectDB = require("./config/db.config");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

connectDB();

app.use('/video',require('./routes/videoRoutes'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
