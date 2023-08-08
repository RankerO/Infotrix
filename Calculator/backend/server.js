const express = require("express");
const app = express();
const cors = require("cors");
const connectdb = require("./database/conn")
require('dotenv').config();
const Operation = require("./models/operation");
const bodyParser = require("body-parser");
const { getOperations } = require("./functions/respond")
const { saveOperation } = require("./functions/respond")

connectdb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", getOperations);
app.post("/operation", saveOperation);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server litening at ${port}`);
});