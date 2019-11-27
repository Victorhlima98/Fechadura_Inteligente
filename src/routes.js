const express = require("express");

const User = require("./controllers/User");
const Log = require("./controllers/Log");

const path = require("path");

const routes = express.Router();

routes.post("/list", User.index);
routes.get("/users/:rfid", User.show);
routes.post("/users", User.store);
routes.post("/editar/:id", User.update);
routes.post("/remove/:id", User.remove);

routes.post("/log", Log.index);

routes.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/user.html"));
});

routes.get("/list", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/list.html"));
});

routes.get("/remove/:id", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/remove.html"));
});

routes.get("/editar/:id", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/editar.html"));
});

routes.get("/log", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/log.html"));
});

module.exports = routes;
