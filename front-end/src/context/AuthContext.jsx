import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  isUserExist: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "user/exist":
      return { ...state, isAuthenticated: false, isUserExist: true };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "inputData/changed":
      return { ...state, isUserExist: false };
    case "incorrect/data":
      return { state, isAuthenticated: false, isUserExist: false };
    case "logged/in":
      return { ...state, isAuthenticated: true, isUserExist: false };
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

      console.log(isUserExist);
      if (isUserExist) {
        dispatch({ type: "user/exist" });
        return null;
      }
      console.log(isUserExist);

      if (!isUserExist) {
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

  const login = async (user) => {
    try {
      const data = await fetch(`http://localhost:9000/users`);
      const users = await data.json();
      users.forEach((currUser) => {
        if (
          currUser.email !== user.email ||
          currUser.password !== user.password
        ) {
          dispatch({ type: "incorrect/data" });
          alert("Email or Password incorrect!");
          return;
        }
      });

      alert("User logged in successfully!");
      dispatch({ type: "logged/in" });
      navigate("/app");
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isUserExist,
        error,
        createNewUser,
        dispatch,
        login,
      }}
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
