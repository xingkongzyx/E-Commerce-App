const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");
// app is an object that describes all the different things that our web server can do.
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// 用于encrypt all the informaton stored in the cookie
app.use(
	cookieSession({
		keys: ["lkasld235j"]
	})
);

const port = process.env.PORT || 3000;

app.get("/signup", (req, res) => {
	res.send(`
    <h1>Sign Up Page</h1>
    Your id is ${req.session.userID}
    <div>
        <form method="POST" >
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Sign Up</button>
        </form>
    </div>
    `);
});

// 接收表格
// bodyParser.urlencoded({extended: true})是专门用于接收表格数据的
app.post("/signup", async (req, res) => {
	// destructure the info
	const { email, password, passwordConfirmation } = req.body;
	// Check if user already signs up with this email
	const existingUser = await usersRepo.getOneBy({ email });

	if (existingUser) {
		// If already signing up with this email
		return res.send("Email in use");
	}
	// Check if password and passwordConfirmation are same
	if (password !== passwordConfirmation) {
		return res.send("Password must match");
	}
	// Create an user in our user repo to represent this person
	const user = await usersRepo.create({ email, password });
	// Store the id of that user inside users cookies
	// req.session是因为cookie library才存在的, req.session==={}
	// 我们添加的任何信息都会被cookie session保持
	req.session.userID = user.id;
	res.send("Account created");
});

// 注销用户
app.get("/signout", (req, res) => {
	// 使cookie为null
	req.session = null;
	res.send("signed out");
});

// 登录用户
app.get("/signin", (req, res) => {
	res.send(`
        <h1>Sign In Page</h1>
        <div>
            <form method="POST" >
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button>Sign In</button>
            </form>
        </div>
    `);
});

app.post("/signin", async (req, res) => {
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

// tell express to watch for incoming request on port 3000
app.listen(port, () => {
	console.log(`Server is connected to port ${port}!`);
});
