import { useReducer, createContext,ReactNode } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Actions Creators
import {
  AuthorizeUser,
  AuthStart,
  AuthSuccess,
  AuthError,
  Logout,
} from "./AuthActions";

// Reducer Functions
import AuthReducer from "./AuthReducer";

interface User {
  id?: string;
  username?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  isFetching: boolean;
  error: any;
}

const INITIAL_STATE = {
  // @ts-ignore
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: null,
  };

export const AuthContext = createContext<AuthState | any>(INITIAL_STATE);

// Auth Service 
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const authorizeUser = async () => {
    try {
      const user = await axios.get("/api/users/showMe", {
        withCredentials: true,
      });
      dispatch(AuthorizeUser(user.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  const loginRequest = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(AuthStart());
    try {
      const res = await axios.post(
        "http://localhost:4001/signin",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      dispatch(AuthSuccess(res.data.id));

      localStorage.setItem("user", JSON.stringify(res.data.id));
      toast.success("Logged in Successfully!");
    } catch (err:any) {
      dispatch(AuthError(err.response.data));
      toast.error(err.response.data.message);
    }
  };

  const registerRequest = async (body: {
    username: string;
    email: string;
    password: string;
  }) => {
    console.log(body);
    dispatch(AuthStart());
    try {
      const res = await axios.post(
        "http://localhost:4001/signup",
        {
          username: body.username,
          email: body.email,
          password: body.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      dispatch(AuthSuccess(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Registered Successfully!");
    } catch (err:any) {
      console.log(err)
      dispatch(AuthError(err.response.data));
      toast.error(err.response.data.message);
    }
  };

  const logoutRequest = async () => {
    localStorage.removeItem("user");
    toast.success("Logged out Successfully!");
    dispatch(Logout());
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authorizeUser,
        loginRequest,
        registerRequest,
        logoutRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
