"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

// Lista Produtos
exports.get = (_, res) => {
  repository
    .get()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// Retorna Um Produto pelo Slug
exports.getBySlug = (req, res) => {
  repository
    .getBySlug(req.params.slug)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// Retorna Um Produto pelo ID
exports.getById = (req, res) => {
  repository
    .getById(req.params.id)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// Lista Produtos pela Tag
exports.getByTag = (req, res) => {
  repository
    .getByTag(req.params.tag)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// Cadastra Produto
exports.post = (req, res) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "O título deve conter pelo menos 3 caracteres!",
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "O slug deve conter pelo menos 3 caracteres!",
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "A descrição deve conter pelo menos 3 caracteres!",
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  repository
    .create(req.body)
    .then((x) => {
      res.status(201).send({ message: "Produto cadastrado com sucesso!" });
    })
    .catch((e) => {
      res
        .status(400)
        .send({ message: "Falha ao cadastrar o produto!", data: e });
    });
};

// Altera Produto
exports.put = (req, res) => {
  repository
    .update(req.params.id, req.body)
    .then((x) => {
      res.status(200).send({ message: "Produto atualizado com sucesso!" });
    })
    .catch((e) => {
      res
        .status(400)
        .send({ message: "Falha ao atualizar o produto!", data: e });
    });
};

// Deleta Produto
exports.delete = (req, res) => {
  repository
    .delete(req.body.id)
    .then((x) => {
      res.status(200).send({ message: "Produto removido com sucesso!" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Falha ao remover o produto!", data: e });
    });
};
