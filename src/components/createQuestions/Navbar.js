import React from 'react';
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';

function Navbar() {
  // ======================= Log out functionality =======================
  const navigate = useNavigate()
  function logOut() {
    navigate('/login')
    localStorage.removeItem("isLoggedIn")
  }

  return (
    <nav className="create-question-navbar">
      <div>LOGO</div>
      <div className="log-out" onClick={logOut}>Log Out</div>
    </nav>
  );
}

export default Navbar;
