const express = require("express");
const bodyParser = require('body-parser')
const usersRepo = require("./repositories/users")
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
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Sign Up</button>
        </form>
    </div>
    `);
});

// 接收表格
// bodyParser.urlencoded({extended: true})是专门用于接收表格数据的
app.post("/", async (req, res) => {
    // destructure the info
    const {email, password, passwordConfirmation} = req.body;
    // Check if user already signs up with this email
    const existingUser = await usersRepo.getOneBy({email});
      
    if(existingUser){
        // If already signing up with this email
        return res.send("Email in use");
    }
    // Check if password and passwordConfirmation are same
    if(password !== passwordConfirmation){
        console.log(password, passwordConfirmation);
        return res.send("Password must match");
    }
    // Create the account
    // usersRepo.create(req.body);
    res.send("Account created");
});

// tell express to watch for incoming request on port 3000
app.listen(port, () => {
	console.log(`Server is connected to port ${port}!`);
});
