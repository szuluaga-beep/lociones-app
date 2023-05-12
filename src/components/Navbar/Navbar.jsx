import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="d-flex p-2 justify-content-between">
        <Link className="navbar-brand" to="/">
          Lociones
        </Link>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Clientes"
                className="nav-link active"
                aria-current="page"
              >
                Clientes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
