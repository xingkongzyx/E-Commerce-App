const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
// An onject keep track of all route handlers
// Then link it with app of index.js
const router = express.Router();

router.get("/signup", (req, res) => {
	res.send(signupTemplate({ req }));
});

// 接收表格
// bodyParser.urlencoded({extended: true})是专门用于接收表格数据的
router.post(
	"/signup",
	[
        // check(property), validator会从req.body中寻找对应的property
        check("email")
			.trim()
			.normalizeEmail()
			.isEmail()
			.custom(async email => {
				// Check if user already signs up with this email
				const existingUser = await usersRepo.getOneBy({ email });

				if (existingUser) {
					// If already signing up with this email
					throw new Error("Email in use");
				}
			}),
		check("password")
			.trim()
			.isLength({ min: 4, max: 20 }),
		check("passwordConfirmation")
			.trim()
			.isLength({ min: 4, max: 20 })
			.custom((passwordConfirmation, { req }) => {
				const { password } = req.body;
				// Check if password and passwordConfirmation are same
				if (password !== passwordConfirmation) {
					throw new Error("Password must match");
				}
			})
	],
	async (req, res) => {
		const errors = validationResult(req);
		console.log(errors);
		// destructure the info
		const { email, password, passwordConfirmation } = req.body;

		// Create an user in our user repo to represent this person
		const user = await usersRepo.create({ email, password });
		// Store the id of that user inside users cookies
		// req.session是因为cookie library才存在的, req.session==={}
		// 我们添加的任何信息都会被cookie session保持
		req.session.userID = user.id;
		res.send("Account created");
	}
);

// 注销用户
router.get("/signout", (req, res) => {
	// 使cookie为null
	req.session = null;
	res.send("signed out");
});

// 登录用户
router.get("/signin", (req, res) => {
	res.send(signinTemplate({ req }));
});

router.post("/signin", async (req, res) => {
	// req.body includes all information user entered in the form
	const { email, password } = req.body;
	// 验证邮箱是否存在
	const user = await usersRepo.getOneBy({ email });
	if (!user) {
		return res.send("Email not found");
	}
	// 验证密码是否匹配
	if (!(await usersRepo.comparePasswords(user.password, password))) {
		return res.send("Password not match!");
	}
	// 登录成功-设置cookie使我们的用户被认为是被验证过的
	req.session.userID = user.id;
	res.send(`ID ${req.session.userID} You are signed In`);
});

module.exports = router;
