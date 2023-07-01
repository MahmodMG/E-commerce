const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("./databases/models/index");
const { init } = require("./src/modules/index.routes");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));
// routes
init(app);
// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/evaluate")
  .then(() => {
    console.log(" db server connected .....");
    app.listen(8082, () => {
      console.log("8082 is listining ..............");
    });
  })
  .catch((err) => console.log(err));
// to handle any errors outside express js (db/connection)
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
