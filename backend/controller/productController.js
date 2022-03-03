import asynchandler from "express-async-handler";
import product from "../models/productModel.js";

const getProduct = asynchandler(async (req, res) => {
  const products = await product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asynchandler(async (req, res) => {
  const Product = await product.findById(req.params.id);

  if (Product) {
    res.json(Product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin

const deleteProduct = asynchandler(async (req, res) => {
  const products = await product.findById(req.params.id);

  if (products) {
    await products.remove();
    res.json({ message: "product remove" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//desc    create a product
// @route   post /api/products
// @access  Private/Admin

const createProduct = asynchandler(async (req, res) => {
  const products = new product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/image.sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await products.save();
  res.status(201).json(createdProduct);
});

//desc    update a product
// @route   put /api/products/:id
// @access  Private/Admin

const updateProduct = asynchandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;
  const products = await product.findById(req.params.id);
  if (products) {
    products.name = name;
    products.price = price;
    products.image = image;
    products.brand = brand;
    products.category = category;
    products.countInStock = countInStock;
    products.numReviews = numReviews;
    products.description = description;

    const updateProduct = await products.save();
    res.status(201).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export {
  getProduct,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
