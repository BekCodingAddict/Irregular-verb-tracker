import { Link } from "react-router-dom";
import "./styles.css";
import axios from "axios";

function Register() {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const inputData = new FormData(e.target);
      const newUserData = {
        userName: inputData.get("userName"),
        email: inputData.get("email"),
        password: inputData.get("password"),
      };
      console.log(newUserData);
      const resp = await axios.post(
        "http://localhost:7777/api/user/sign-up",
        newUserData
      );
      if (resp.data.success) {
        alert(resp.data.message);
      } else {
        alert(resp.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
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
          <div className="form-wrapper sing-up">
            <form action="" onSubmit={onSubmit}>
              <h2>Sign Up</h2>
              <div className="input-group">
                <input type="text" name="userName" required></input>
                <label>Username</label>
              </div>
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
                <label>I agree to the terms & conditions</label>
              </div>
              <button type="submit">Sign Up</button>
              <div className="singUp-link">
                <p>
                  Already have an account?
                  <Link to="/login" className="singIpBtn-link">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
