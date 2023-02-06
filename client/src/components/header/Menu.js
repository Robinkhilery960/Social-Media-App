import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction.js";
import { GLOBALTYPES } from "../../redux/actions/globalTypes.js";
import Avatar from "../Avatar.js"; 

function Menu() {
    const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  console.log(auth);
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite", path: "/notify" },
  ];

  const isActive = (pn) => {
    return pathname === pn ? "active" : "";
  };
  return (
    <div className=" menu">
          <ul className="navbar-nav  flex-row mb-2 mb-lg-0">
            {navLinks.map((link, index) => (
              <li className="nav-item">
                <Link
                  className={`nav-link px-2  ${isActive(link.path)}`}
                  aria-current="page"
                  to={link.path}
                  key={index}
                >
                  <span className="material-icons">{link.icon}</span>
                </Link>
              </li>
            ))}

            <li className="nav-item dropdown" style={{ opacity: 1 }}>
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <Avatar src={auth.user.avatar} size="md-avatar"   />
              </span>

              <div className="dropdown-menu" >
                <Link
                  className="dropdown-item"
                  to={`/profile/${auth.user._id}`}
                >
                  Profile
                </Link> 
                <label
                  htmlFor="theme"
                  className="dropdown-item"
                  onClick={() =>
                    dispatch({
                      type: GLOBALTYPES.THEME,
                      payload: !theme,
                    })
                  }
                >
                  {theme ? "Light mode" : "Dark mode"}
                </label> 
                <div className="dropdown-divider"></div>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
  )
}

export default Menu