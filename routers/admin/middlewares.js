// Used to handle errors after using check() method of "express-validator"
const { validationResult } = require("express-validator");

module.exports = {
	handleErrors(templateFunc) {
		return (req, res, next) => {
			const errors = validationResult(req);
			// If some errors during validation
			if (!errors.isEmpty()) {
				return res.send(templateFunc({ errors }));
			}
			// If no error
			next();
		};
	}
};
