import React, { useState, useContext } from "react";
import { NavLink,useLocation } from "react-router-dom";
import "./Navigation.scss";

const Navigation: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <ul className="navlist right">
            <li>
              <NavLink className={location.pathname === '/login' ? 'item active': 'item'} to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className={location.pathname === '/regisr' ? 'item active': 'item'}  to="/register">
                Register
              </NavLink>
            </li>
      </ul>
    </nav>
  );
};

export default Navigation;
