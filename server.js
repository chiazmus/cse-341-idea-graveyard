const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const port = 3000;

app
  .use(cors())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port, () => {
      console.log(
        "Database listening, Node running on port " + (process.env.PORT || port)
      );
    });
  }
});
