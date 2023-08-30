"use strict";

exports.post = (req, res) => {
  res.status(201).send(req.body);
};

exports.put = (req, res) => {
  const id = req.params.id;
  res.status(201).send({ id: id, item: req.body });
};

exports.delete = (req, res) => {
  res.status(200).send(req.body);
};
