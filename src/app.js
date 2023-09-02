"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

// Conecta ao banco
mongoose.connect(config.connectionString);

// Carrega os models
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");

// Carrega as rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");
const customerRoute = require("./routes/customer-route");
const orderRoute = require("./routes/order-route");

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
