const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");

const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validators");
// Create a new router
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
// const upload = multer({ dest: "uploads" });
// List all products to user
router.get("/admin/products", (req, res) => {
	res.send("");
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
	async (req, res) => {
		const errors = validationResult(req);
		// If some errors during validation
		if (!errors.isEmpty()) {
			return res.send(productsNewTemplate({ errors }));
		}
		// 以string的形式存储image
		const image = req.file.buffer.toString("base64");
		const { title, price } = req.body;
		// create a new product
		await productsRepo.create({ title, image, price });
		res.send("Submitted");
	}
);

module.exports = router;
