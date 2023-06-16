import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar bg-dark ps-2 pe-5 vh-100 d-none d-sm-inline-block col-12">
        <ul className="nav flex-column gap-3 mt-4">
          <li className="nav-item">
            <Link to="/" className="nav-link active text-light">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/other" className="nav-link text-light">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/other" className="nav-link text-light">
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/other" className="nav-link text-light">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/other" className="nav-link text-light">
              Admin Portal
            </Link>
          </li>
        </ul>
        <h6 className="ms-auto text-light  text-center setting mb-5">
          Setting
        </h6>
      </div>

      <div className="sidebar bg-dark ps-2 pe-5 h-100 d-sm-none ">
        <ul className="nav flex-column gap-3 ">
          <li className="nav-item">
            <Link to="/" className="nav-link active text-light">
              <i class="fa-solid fa-house-user"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/other" className="nav-link text-light">
              <i class="fa-solid fa-bus"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/other" className="nav-link text-light">
              <i class="fa-solid fa-user"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/other" className="nav-link text-light">
              <i class="fa-solid fa-unlock"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/other" className="nav-link text-light"></Link>
          </li>
        </ul>
        <h6 className="text-light text-center setting ">
          <i class="fa-solid fa-gear"></i>
        </h6>
      </div>
    </>
  );
};

export default Sidebar;
