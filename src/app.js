"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Conecta ao banco
mongoose.connect("mongodb+srv://anderson:a29s08a91@ndstr.dgoqxql.mongodb.net/");

// Carrega os models
const Product = require("./models/product");

// Carrega as rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
