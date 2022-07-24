import "./loginpage.css";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div className="ui segment placeholder" id="loginForm">
      <div className="ui form">
        <form>
          <div className="field">
            <label>Username</label>
            <div className="ui left icon input">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value=""
              />
              <i className="user icon"></i>
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="ui left icon input">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value=""
              />
              <i className="lock icon"></i>
            </div>
          </div>
          <div className="ui blue submit button">Login</div>
        </form>
      </div>
      <div className="ui horizontal divider">Or</div>
      <Link to="/signup">
        <div className="middle aligned column">
          <div className="ui big button">
            <i className="signup icon"></i>
            Sign Up
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LoginPage;
