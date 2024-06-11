// src/components/UserMenu.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import setting from "../assets/setting.png";
import Logout from "../assets/logout.png";

const UserMenu = ({ data, toggleMenu, isOpen, subMenuRef, logout }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, subMenuRef, toggleMenu]);

  return (
    <div className="User">
      <div className="UserText p-1">{data.name}</div>
      <div>
        <img
          className="UserImage"
          src={
            "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
          }
          alt=""
          onClick={toggleMenu}
          style={{cursor: "pointer"}}
        />
        <div
          id="subMenu"
          ref={subMenuRef}
          className={isOpen ? "sub-menu-wrap" : "sub-menu-wrap-2"}
        >
          <div className="sub-menu">
            <Link to="/profile" className="sub-menu-link">
              <img src={Profile} alt="Profile" />
              <p>Profile</p>
              {/* <span><img src={lessThen} alt="lessThen" /></span> */}
            </Link>
            <Link to="/setting" className="sub-menu-link">
              <img src={setting} alt="setting" />
              <p>Setting</p>
              {/* <span><img src={lessThen} alt="lessThen" /></span> */}
            </Link>
            <div
              className="sub-menu-link"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              <img src={Logout} alt="Logout" />
              <p>Logout</p>
              {/* <span><img src={lessThen} alt="lessThen" /></span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
