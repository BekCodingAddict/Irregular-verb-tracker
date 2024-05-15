import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isUserExist: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "user/exist":
      return { ...state, isAuthenticated: false, isUserExist: true };
    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action!");
  }
};

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [{ user, isAuthenticated, isUserExist, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function createNewUser(newUser) {
    try {
      const data = await fetch(`http://localhost:9000/users`);
      const users = await data.json();
      users.forEach((user) => {
        if (
          user.email === newUser.email &&
          user.password === newUser.password
        ) {
          dispatch({ type: "user/exist" });
          alert("This user already exist!");
          return;
        }
      });

      if (isUserExist === false) {
        const resp = await fetch(`http://localhost:9000/users`, {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("Your registration has been successfully finished!");
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
      dispatch({ type: "error", payload: error.message });
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isUserExist, error, createNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used ouside of AuthProvider!");
  return context;
}

export { AuthProvider, useAuth };
