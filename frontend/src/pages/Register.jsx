import { Link } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Register() {
  const { createNewUser, dispatch } = useAuth();
  const [userDatas, setUserDatas] = useState({
    userName: "",
    email: "",
    password: "",
  });
  //   const onSubmit = async (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.target);
  //     const newData = {
  //       name: data.get("name"),
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     };
  //     console.log(newData);
  //     try {
  //       const response = await axios.post("/api/users/register", newData);
  //       if (response.data.success) {
  //         message.success(response.data.message);
  //       } else {
  //         message.error(response.data.message);
  //       }
  //     } catch (error) {
  //       message.error(error.message);
  //     }
  //   };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      userName: userDatas.userName,
      email: userDatas.email,
      password: userDatas.password,
      irregularVerbs: [
        {
          baseForm: "",
          pastSimple: "",
          pastParticile: "",
          examples: [
            {
              baseForm: [],
              pastSimple: [],
              pastParticiple: [],
            },
          ],
        },
      ],
    };
    console.log(newUser);
    createNewUser(newUser);
  };

  useEffect(() => {
    dispatch({ type: "inputData/changed" });
    console.log("input Data Changed");
  }, [userDatas.userName, userDatas.email, userDatas.password, dispatch]);

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
                <input
                  type="text"
                  name="userName"
                  value={userDatas.userName}
                  onChange={(e) =>
                    setUserDatas({ ...userDatas, userName: e.target.value })
                  }
                  required
                ></input>
                <label>Username</label>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={userDatas.email}
                  onChange={(e) =>
                    setUserDatas({ ...userDatas, email: e.target.value })
                  }
                  required
                ></input>
                <label>Email</label>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={userDatas.password}
                  onChange={(e) =>
                    setUserDatas({ ...userDatas, password: e.target.value })
                  }
                  required
                ></input>
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
