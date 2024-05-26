import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const inputData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(inputData);
    login(inputData);
  };

  return (
    <div className="body">
      <div className="main">
        <div className="title">
          <h1>Irregular Verb Tracker</h1>
          <h4>New Here?</h4>
          <p>
            Enter your personal details and start to enjoy using Irregular verb
            traker!
          </p>
        </div>
        <div className="wrapper">
          <div className="form-wrapper sing-in">
            <form onSubmit={onSubmit}>
              <h2>Login</h2>
              <div className="input-group">
                <input type="email" name="email" required></input>
                <label>Email</label>
              </div>
              <div className="input-group">
                <input type="password" name="password" required></input>
                <label>Password</label>
              </div>
              <div className="remember">
                <input type="checkbox"></input>
                <label>Remember me</label>
              </div>
              <button type="submit">Login</button>
              <div className="singUp-link">
                <p>
                  Don &apos;t have an account?
                  <Link to="/register">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
