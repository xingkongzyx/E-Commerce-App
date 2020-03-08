const layout = require("../layout");
const {getError} = require("../../helper")

module.exports = ({ req, errors }) => {
	return layout({
		content: `
    <h1>Sign Up Page</h1>
    Your id is ${req.session.userID}
    <div>
        <form method="POST" >
            <input name="email" placeholder="email" />
            ${getError(errors, "email")}
            <input name="password" placeholder="password" />
            ${getError(errors, "password")}
            <input name="passwordConfirmation" placeholder="password confirmation" />
            ${getError(errors, "passwordConfirmation")}
            <button>Sign Up</button>
        </form>
    </div>
`
	});
};
