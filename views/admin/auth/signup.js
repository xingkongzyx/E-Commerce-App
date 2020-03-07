module.exports = ({req}) => {
    return `
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
    `
}