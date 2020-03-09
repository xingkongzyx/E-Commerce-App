const express = require("express");
const multer = require("multer");
const { handleErrors } = require("./middlewares");

const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const productsIndexTemplate = require("../../views/admin/products/index");
const { requireTitle, requirePrice } = require("./validators");

// Create a new router
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// List all products to user
router.get("/admin/products", async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

// show a form to the user to create a new product
router.get("/admin/products/new", (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post(
	"/admin/products/new",
	// 其中name是我们表格中img的name
	upload.single("image"),
	[requireTitle, requirePrice],
	handleErrors(productsNewTemplate),
	async (req, res) => {
		// 以string的形式存储image
		const image = req.file.buffer.toString("base64");
		const { title, price } = req.body;
		// create a new product
		await productsRepo.create({ title, image, price });
		res.send("Submitted");
	}
);

module.exports = router;
