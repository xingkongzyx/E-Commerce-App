const express = require("express");
const productsRepo = require("../../repositories/products");
const { validationResult } = require("express-validator");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validators");
// Create a new router
const router = express.Router();

// List all products to user
router.get("/admin/products", (req, res) => {
	res.send("");
});

// show a form to the user to create a new product
router.get("/admin/products/new", (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
	const errors = validationResult(req);
	console.log(errors);
	res.send("Submitted");
});

module.exports = router;
