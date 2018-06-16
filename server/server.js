require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const serveStatic = require('serve-static');
//  Require internal packages
const routes = require("./routes");
const passport = require("./scripts/passportConfig")

//  Init express
const app = express();
  
// Mongo connection
const connectUrl = process.env.MONGODB_URI;
mongoose.connect(connectUrl);
mongoose.Promise = Promise;

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());

// App routes

app.use('/api/auth', routes.Auth);
app.use("/api/user", routes.User);
app.use("/api/event", routes.Event);
app.use('/api/coms', routes.Coms);

//  Error Catcher
app.use(function(error, req, res, next) {
  console.log(error);
  res.json({ message: error });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on Port:", PORT);
  }
});
