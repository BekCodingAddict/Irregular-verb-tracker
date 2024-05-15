import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="container">
      <div className="logo">
        <img
          src="../public/Logo.png"
          alt="Logo"
          width={"180px"}
          height={"100px"}
        />
      </div>

      <button className="login-btn">
        <Link style={{ color: "#fff" }} to="/login">
          Login
        </Link>
      </button>
    </nav>
  );
};
export default Navigation;
