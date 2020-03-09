const express = require("express");
const multer = require("multer");
const { handleErrors, requireAuth } = require("./middlewares");

const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const productsIndexTemplate = require("../../views/admin/products/index");
const productsEditTemplate = require("../../views/admin/products/edit");
const { requireTitle, requirePrice } = require("./validators");

// Create a new router
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// List all products to user
router.get("/admin/products", requireAuth, async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

// show a form to the user to create a new product
router.get("/admin/products/new", requireAuth, (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post(
	"/admin/products/new",
	// 如果没有登录，则不能进行下面的操作
	requireAuth,
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
		// 创建成功后,返回products界面
		res.redirect("/admin/products");
	}
);

// Used to edit a product
router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
	const id = req.params.id;
	// Try to find the product based on id
	const product = await productsRepo.getOne(id);
	// If not find the product
	if (!product) {
		res.redirect("/admin/products");
	}
	res.send(productsEditTemplate({ product }));
});

// Used to receive the submition of edit form
router.post("/admin/products/:id/edit", requireAuth, async (req, res) => {
	res.send("received");
});

module.exports = router;
