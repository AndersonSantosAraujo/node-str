"use strict";

const authService = require("../services/auth-service");

const express = require("express");
const router = express.Router();
const controller = require("../controllers/order-controller");

router.get("/", authService.authorize, controller.get);
router.post("/", authService.authorize, controller.post);

module.exports = router;
