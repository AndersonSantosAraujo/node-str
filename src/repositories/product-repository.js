const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = async (query) => {
  const page = Number(query.page) - 1 || 0;
  const limit = Number(query.limit) || 5;

  const res = await Product.find(
    { active: true },
    "title description price slug tags image",
  )
    .skip(page * limit)
    .limit(limit);

  const total = await Product.countDocuments({ active: true });

  return {
    total,
    page: page + 1,
    limit: limit,
    products: res,
  };
};

exports.getBySlug = async (slug) => {
  const res = await Product.findOne(
    { slug: slug, active: true },
    "title description price slug tags image",
  );
  return res;
};

exports.getById = async (id) => {
  const res = await Product.findById(id);
  return res;
};

exports.getByTag = async (query, tag) => {
  const page = Number(query.page) - 1 || 0;
  const limit = Number(query.limit) || 5;

  const res = await Product.find(
    { tags: tag, active: true },
    "title description price slug tags image",
  )
    .skip(page * limit)
    .limit(limit);

  const total = await Product.countDocuments({ tags: tag, active: true });

  return {
    total,
    page: page + 1,
    limit: limit,
    products: res,
  };
};

exports.create = async (data) => {
  const product = new Product(data);
  await product.save();
};

exports.update = async (id, data) => {
  await Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug,
    },
  });
};

exports.delete = async (id) => {
  await Product.findByIdAndRemove(id);
};
