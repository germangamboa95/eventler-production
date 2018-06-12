
const express = require('express');
const serveStatic = require('serve-static');
const morgan = require('morgan');
//  Init express
const app = express();
// Middlewares
app.use(morgan("dev"));


app.use('/',serveStatic(__dirname + "/build"));
//  Error Catcher
app.use(function(error, req, res, next) {
  console.log(error);
  res.json({ message: error });
});

// Start Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on Port:", PORT);
  }
});
