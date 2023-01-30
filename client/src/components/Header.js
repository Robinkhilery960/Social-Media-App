import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction.js";
import { GLOBALTYPES } from "../redux/actions/globalTypes.js";
import Avatar from "./Avatar.js";

function Header() {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "notify", path: "/notify" },
  ];

  const isActive = (pn) => {
    return pathname === pn ? "active" : "";
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-between align-middle ">
      <div className="container-fluid">
        <Link to="/">
          <h1 className="navbar-brand text-uppercase p-0 m-0 ">THE NETWORK</h1>
        </Link>

        <div className="collapse navbar-collapse menu">
          <ul className="navbar-nav  flex-row mb-2 mb-lg-0">
            {navLinks.map((link, index) => {
              <li className="nav-item">
                <Link
                  className={`nav-link px-2  ${isActive(link.path)}`}
                  aria-current="page"
                  to={link.path}
                  key={index}
                >
                  <span classNameName="material-icon">{link.icon}</span>
                </Link>
              </li>;
            })}

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <Avatar src={auth.user.token}/> */}
              </span>
              <ul className="dropdown-menu">
                <li>
                  {/* <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                    Profile
                  </Link> */}
                </li>
                <label
                  htmlFor="theme"
                  className="dropdown-item"
                  onClick={() =>
                    dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
                  }
                >
                  {" "}
                  {theme ? "Light Mode" : "Dark Mode"}
                </label>

                <li>
                  <Link
                    className="dropdown-item"
                    to={`/`}
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
