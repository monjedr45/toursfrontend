import { NavLink } from 'react-router-dom'
import Logo from '../../images/logo-no-background2.png'

//! css styles 
import './footer.css'


export default function Footer() {
    return (
        <div className="footer">
            <div className="footer__logo">
                <img src={Logo} alt="jotours logo" />
            </div>
            <ul className="footer__nav">
                <li><NavLink to="#">About us</NavLink></li>
                <li><NavLink to="#">Download apps</NavLink></li>
                <li><NavLink to="#">Become a guide</NavLink></li>
                <li><NavLink to="#">Careers</NavLink></li>
                <li><NavLink to="#">Contact</NavLink></li>
            </ul>
            <p className="footer__copyright">
                &copy; by Ali Obeidat. All rights reserved.
            </p>
        </div>
    )
}
