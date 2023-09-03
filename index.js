"use strict";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const config = require("./src/config");

const app = express();

// Conecta ao banco
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

// Carrega os models
require("./src/models/product");
require("./src/models/customer");
require("./src/models/order");

// Carrega as rotas
const indexRoute = require("./src/routes/index-route");
const productRoute = require("./src/routes/product-route");
const customerRoute = require("./src/routes/customer-route");
const orderRoute = require("./src/routes/order-route");

app.use(
  bodyParser.json({
    limit: "5mb",
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // <- coloca as URL's que usarão a API; no caso, todas são permitidas
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

module.exports = app;
