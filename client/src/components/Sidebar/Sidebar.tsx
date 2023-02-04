import React, {useContext} from 'react';
import { NavLink,useLocation } from "react-router-dom";
import { IoStatsChartSharp } from "react-icons/io5";
import {FaMapSigns} from 'react-icons/fa';
import "./Sidebar.scss";
import { AuthContext } from "../../context/auth/AuthContext.jsx";

const Sidebar: React.FC  = () => {
  const { user, logoutRequest } = useContext(AuthContext);
  const location = useLocation()

  const handleLogout = async () => {
    try {
      logoutRequest();
    } catch (err) {
      console.log(err);
    }
  };

    return (
      <aside className="sidebar">
        <nav>
          <h3>Dashboard</h3>
          <ul>
            <li>
              <NavLink className={location.pathname === '/' ? 'item active': 'item'}  to="/">
                <span>
                  <IoStatsChartSharp />
                </span>
                Charts
              </NavLink>
            </li>
            <li>
              <NavLink className={location.pathname === '/maps' ? 'item active': 'item'}  to="/maps">
                <span>
                  <FaMapSigns />
                </span>
                Maps
              </NavLink>
            </li>
          </ul>
        </nav>
        <button onClick={() => handleLogout()}>Logout</button>
      </aside>
    );
}

export default Sidebar;