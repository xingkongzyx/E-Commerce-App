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
	},

	requireAuth(req, res, next) {
        // check if userid sesion exists or not, if not, redirect to signin
        if (!req.session.userID) {
			return res.redirect("/signin");
        }
        console.log(`METHOD IS ${req.method} PATH IS ${req.path}`)
        // Otherwise, call next func
		next();
	}
};
