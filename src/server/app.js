const express = require("express");
const cors = require("cors");
const consign = require("consign");
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const path = require("path");
const uploadUser = require("../middlewares/uploadImage");

const app = express();

const file = path.join(__dirname, "server.json");
const adapter = new FileSync(file);
const db = low(adapter);

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER,Content-Type,Authorization"
  );
  app.use(cors());
  next();
});

consign().include("./src/routes").into(app, db);

module.exports = app;
