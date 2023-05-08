const express = require('express');
const sequelize = require("./util/database");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const userRoute = require('./routes/main');
app.use(userRoute);

sequelize
.sync()
.catch((err) => console.log(err));

app.listen(3000);