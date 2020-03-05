const express = require("express");
const bodyParser = require('body-parser')
// app is an object that describes all the different things that our web server can do.
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
	res.send(`
    <div>
        <form method="POST" >
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="emailConfirm" placeholder="password confirmation" />
            <button>Sign Up</button>
        </form>
    </div>
    `);
});

// 接收表格
// bodyParser.urlencoded({extended: true})是专门用于接收表格数据的
app.post("/", (req, res) => {
    console.log(req.body)
    res.send("Account created");
});

// tell express to watch for incoming request on port 3000
app.listen(port, () => {
	console.log(`Server is connected to port ${port}!`);
});
