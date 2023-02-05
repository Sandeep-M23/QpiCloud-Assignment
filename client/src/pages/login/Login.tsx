import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

type User = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [formInput, setFormInput] = useState<User>({});
  const navigate = useNavigate();
  const { isFetching, error, loginRequest } = useContext(AuthContext);

  const handleChange = ({ target } : any) => {
    const { name, value } = target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    if (!formInput.email || !formInput.password) return;
    await loginRequest(formInput);
    navigate("/");
  };

  return (
    <div className="login">
      <form className="box" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formInput.email || ''}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formInput.password || ""}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="actions">
          <div>
            <button className="submit" type="submit" disabled={isFetching}>
              Login
            </button>
          </div>
          <button
            className="cancel"
            type="button"
            onClick={() => setFormInput({})}
            disabled={isFetching}
          >
            Cancel
          </button>
        </div>
        <div className="create">
          <span>Dont have an Account?</span>
          <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
