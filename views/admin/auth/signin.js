const layout = require("../layout");
const {getError} = require("../../helper")

module.exports = ({ req, errors }) => {
	return layout({
		content: `
    <h1>Sign In Page</h1>
    Your current id is ${req.session.userID}
    <div>
        <form method="POST" >
            <input name="email" placeholder="email" />
            ${getError(errors, "email")}
            <input name="password" placeholder="password" />
            ${getError(errors, "password")}
            <button>Sign In</button>
        </form>
    </div>
`
	});
};
