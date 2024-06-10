// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import logoWEbsite from "../assets/logoWEbsite.png"
const NavBar = ({ role, data, toggleMenu, isOpen, subMenuRef, logout }) => {
    const commonLinks = {
        AdminFaculty: [
            { path: '/Admin_Faculity/', text: 'الكنترول' },
            { path: '/Admin_Faculity/CreateControl', text: 'ادارة الكنترول' },
            { path: '/Admin_Faculity/Register', text: 'التسجيل' },
            { path: '/Admin_Faculity/Records', text: 'الأرشيف' }
        ],
        AdminUniversity: [
            { path: '/Admin_University/', text: 'الكنترول' }
        ],
        Staff: [
            { path: '/Staff/', text: 'الكنترول' }
        ]
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ background: "rgba(152, 218, 255, 1)", padding: "0rem" }}>
            <div className="container-fluid">
                <div className="navbar-brand Logo" style={{ marginLeft: "5%" }}>
                    CMS
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {commonLinks[role].map((link, index) => (
                            <li key={index} className="nav-item nav-item-navbar">
                                <Link className="nav-link" to={link.path}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex">
                        <UserMenu
                            data={data}
                            toggleMenu={toggleMenu}
                            isOpen={isOpen}
                            subMenuRef={subMenuRef}
                            logout={logout}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
