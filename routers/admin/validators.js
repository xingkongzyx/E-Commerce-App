// Put all validators inside this file

const { check } = require("express-validator");
const usersRepo = require("../../repositories/users");
module.exports = {
	// check(property), validator会从req.body中寻找对应的property
	requireEmail: check("email")
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
	requirePassword: check("password")
		.trim()
		.isLength({ min: 4, max: 20 }),
	requirePasswordConfirmation: check("passwordConfirmation")
		.trim()
		.isLength({ min: 4, max: 20 })
		.custom((passwordConfirmation, { req }) => {
			const { password } = req.body;
			// Check if password and passwordConfirmation are same
			if (password !== passwordConfirmation) {
				throw new Error("Password must match");
			}
		})
};
