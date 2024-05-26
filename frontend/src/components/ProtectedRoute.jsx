import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const resp = await axios.post(
          "http://localhost:7777/api/user/get-user-by-id",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (resp.data.success) {
          dispatch(SetUser(resp.data.data));
        } else {
          localStorage.removeItem("token");
          alert(resp.data.message);
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("token");
        alert(error.message);
        navigate("/login");
      }
    };

    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
