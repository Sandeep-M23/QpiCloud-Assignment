import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.scss';
import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Navigation from './components/Navigation/Navigation';
import Maps from './pages/maps/Maps';
import { AuthContext } from "./context/auth/AuthContext";


interface ProtectedRouteProps {
  user: boolean;
}
interface AppProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user }) => {
  return user ? <Outlet /> : <Navigate to='/login' />;
};

const App: React.FC<AppProps> = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        {!user && <Navigation />}
        <div className="contentWrapper">
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/maps" element={<Maps />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
