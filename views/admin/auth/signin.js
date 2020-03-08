const layout = require("../layout");
const {getError} = require("../../helper")

module.exports = ({ req,errors }) => {
    return layout({
      content: `
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-one-quarter">
              <form method="POST">
                <h1 class="title">Sign in</h1>
                Your current id is ${req.session.userID}
                <div class="field">
                  <label class="label">Email</label>
                  <input required class="input" placeholder="Email" name="email" />
                  <p class="help is-danger">${getError(errors, 'email')}</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <input required class="input" placeholder="Password" name="password" type="password" />
                  <p class="help is-danger">${getError(errors, 'password')}</p>
                </div>
                <button class="button is-primary">Submit</button>
              </form>
              <a href="/signup">Need an account? Sign Up</a>
            </div>
          </div>
        </div>
      `
    });
  };
  