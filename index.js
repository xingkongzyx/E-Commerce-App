const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
// Inport the router
const authRouter = require("./routers/admin/auth");
const adminProductsRouter = require("./routers/admin/products");
const productsRouter = require("./routers/products");
const cartsRouter = require("./routers/carts");

// app is an object that describes all the different things that our web server can do.
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// 用于encrypt all the informaton stored in the cookie
app.use(
	cookieSession({
		keys: ["lkasld235j"]
	})
);
// 位置很重要在另两个app.use()后面; associate the router
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

const port = process.env.PORT || 3000;

// tell express to watch for incoming request on port 3000
app.listen(port, () => {
	console.log(`Server is connected to port ${port}!`);
});
