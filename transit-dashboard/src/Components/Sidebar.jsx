import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark ps-2 pe-5 vh-100 d-none d-sm-inline-block col-12">
      <ul className="nav flex-column gap-3 mt-4">
        <li className="nav-item">
          <a className="nav-link active text-light" href="/">
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="/users">
            Users
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="/orders">
            Orders
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="/products">
            Products
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="/settings">
            Admin Portal
          </a>
        </li>
      </ul>
      <h6 className="ms-auto text-light  text-center setting mb-5">Setting</h6>
    </div>
  );
};

export default Sidebar;
