"use strict";

require("dotenv").config();
// const config = require("../config");
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_KEY);

exports.send = async (to, subject, body) => {
  sendgrid.send({
    to: to,
    from: process.env.SENDGRID_SENDER,
    subject: subject,
    html: body,
  });
};
