import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from '../../hooks/useLogout'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'
import whiteLogo from '../../images/logo-no-background.png'

export default function NavBar() {
  const { user } = useAuthContext()
  const location = useLocation();
  const { logout } = useLogout()
  const [click, setClick] = useState(false);


  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const handelLogout = () => {
    logout(JSON.parse(localStorage.getItem("token")))
  }

  return (
    <div>

      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <div className="header__logo">
              <img src={whiteLogo} alt="jotours logo" />
            </div>
            <i className="fa fa-code"></i>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink

                to="/"
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                All Tour
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">

                  <button className="nav__el nav-links" onClick={handelLogout}>Logout</button>
                </li>
                <li className="nav-item">
                  <NavLink

                    to="/my_profile"
                    activeclassname="active"
                    className="nav-links "
                    onClick={click ? handleClick : null}
                  >
                    <img src={`http://localhost:3000/img/users/${user.photo}`} alt="User" className="nav__user-img" />
                    <span>{user.name.split(' ')[0]}</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink

                    to="/login"
                    state={{ prev: location.pathname }}
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink

                    to="/signup"
                    activeclassname="active"
                    className="nav-links nav__el--cta"
                    onClick={click ? handleClick : null}
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}


          </ul>
          <div className="nav-icon" onClick={handleClick}>

            <i className={click ? "fa fa-times" : "fa fa-bars"}> {click ? <FaTimes /> : <FaBars />}</i>
          </div>
        </div>
      </nav>
    </ div>
  );
}
