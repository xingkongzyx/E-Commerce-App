const express = require("express");
const productsRepo = require("../../repositories/products");

// Create a new router
const router = express.Router();

// List all products to user
router.get("/admin/products", (req, res) => {
	res.send("");
});

// show a form to the user to create a new product
router.get("/admin/products/new", (req, res) => {
	res.send("");
});

module.exports = router;
