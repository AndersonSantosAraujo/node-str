"use strict";

require("dotenv").config();
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");
const md5 = require("md5");
const emailService = require("../services/email-service");
const authService = require("../services/auth-service");

// Cadastra Cliente
exports.post = async (req, res) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.name,
    3,
    "O nome deve conter pelo menos 3 caracteres!",
  );
  contract.isEmail(req.body.email, "E-mail inválido!");
  contract.hasMinLen(
    req.body.password,
    6,
    "A Senha deve conter pelo menos 6 caracteres!",
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + process.env.SALT_KEY),
      roles: ["user"],
    });

    emailService.send(
      req.body.email,
      "Bem-Vindo ao Node Store",
      `Olá, <strong>${req.body.name}</strong>, seja bem-vindo à Node Store`,
    );

    res.status(201).send({ message: "Cliente cadastrado com sucesso!" });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

// Valida o Cliente
exports.authenticate = async (req, res) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + process.env.SALT_KEY),
    });

    if (!customer) {
      res.status(404).send({ message: "Usuário ou senha inválido!" });
      return;
    }

    const token = await authService.generateToken({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    });

    res.status(201).send({
      token: token,
      data: { email: customer.email, name: customer.name },
    });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    // Recupera o Token
    const token_ =
      req.body.token || req.query.token || req.headers["x-access-token"];

    // Decodifica o Token
    const data = await authService.decodeToken(token_);

    const customer = await repository.getById(data.id);

    if (!customer) {
      res.status(404).send({ message: "Cliente não encontrado!" });
      return;
    }

    const token = await authService.generateToken({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    });

    res.status(201).send({
      token: token,
      data: { email: customer.email, name: customer.name },
    });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};
