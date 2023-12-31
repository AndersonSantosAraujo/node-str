"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");
const uploadService = require("../services/upload-service");

// Lista Produtos
exports.get = async (req, res) => {
  try {
    const data = await repository.get(req.query);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

// Retorna Um Produto pelo Slug
exports.getBySlug = async (req, res) => {
  try {
    const data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

// Retorna Um Produto pelo ID
exports.getById = async (req, res) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

// Lista Produtos pela Tag
exports.getByTag = async (req, res) => {
  try {
    const data = await repository.getByTag(req.query, req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

// Cadastra Produto
exports.post = async (req, res) => {
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

  try {
    // Upload Cloudinary Service
    const result = await uploadService.send(req.body.image);

    await repository.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      active: true,
      tags: req.body.tags,
      image: result.url,
    });
    res.status(201).send({ message: "Produto cadastrado com sucesso!" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

// Altera Produto
exports.put = async (req, res) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({ message: "Produto atualizado com sucesso!" });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

// Deleta Produto
exports.delete = async (req, res) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({ message: "Produto removido com sucesso!" });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};
