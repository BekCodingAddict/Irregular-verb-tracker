import { Link, useNavigate } from "react-router-dom";

import "./styles.css";

function Login() {
  const navigate = useNavigate();

  //   const onSubmit = async (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.target);
  //     const newData = {
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     };
  //     console.log(newData);

  //     try {
  //       const response = await axios.post("/api/users/login", newData);
  //       if (response.data.success) {
  //         message.success(response.data.message);
  //         localStorage.setItem("token", response.data.data);
  //         navigate("/");
  //       } else {
  //         message.error(response.data.message);
  //       }
  //     } catch (error) {
  //       message.error(error.message);
  //     }
  //   };

  const onSubmit = (e) => {
    e.preventDefault();
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
                  Don't have an account?
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
