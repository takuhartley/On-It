const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  fs = require("fs"),
  path = require("path"),
  PORT = 5000,
  mongoose = require("mongoose");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
// app.use((req, res, next) => {});

// Server
app.listen(PORT, () => console.log(`Connected to server on ${PORT} fam.`));
