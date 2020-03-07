module.exports = ({ req }) => {
	return `
        <h1>Sign In Page</h1>
        Your current id is ${req.session.userID}
        <div>
            <form method="POST" >
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button>Sign In</button>
            </form>
        </div>
    `;
};
