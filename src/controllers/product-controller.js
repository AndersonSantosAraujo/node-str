"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

// Lista Produtos
exports.get = (_, res) => {
  // Só traz produtos ativos (filtro) e só retorna os campos "title price slug"
  Product.find({ active: true }, "title price slug")
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// Retorna Um Produto pelo Slug
exports.getBySlug = (req, res) => {
  Product.findOne(
    { slug: req.params.slug, active: true },
    "title description price slug tags",
  )
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// Retorna Um Produto pelo ID
exports.getById = (req, res) => {
  Product.findById(req.params.id)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// Lista Produtos pela Tag
exports.getByTag = (req, res) => {
  Product.find(
    { tags: req.params.tag, active: true },
    "title description price slug tags",
  )
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// Cadastra Produto
exports.post = (req, res) => {
  // Ou assim:
  // const product = new Product();
  // product.title = req.body.title;
  // product.slug = req.body.slug;
  // ...
  const product = new Product(req.body);
  product
    .save()
    .then((x) => {
      res.status(201).send({ message: "Produto cadastrado com sucesso!" });
    })
    .catch((e) => {
      res
        .status(400)
        .send({ message: "Falha ao cadastrar o produto!", data: e });
    });
};

exports.put = (req, res) => {
  // const id = req.params.id;
  // res.status(201).send({ id: id, item: req.body });
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug,
    },
  })
    .then((x) => {
      res.status(200).send({ message: "Produto atualizado com sucesso!" });
    })
    .catch((e) => {
      res
        .status(400)
        .send({ message: "Falha ao atualizar o produto!", data: e });
    });
};

exports.delete = (req, res) => {
  res.status(200).send(req.body);
};
