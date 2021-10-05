import { useEffect, useState } from 'react'
import {Link, useLocation } from "react-router-dom";
import '../assets/styles/Nav.css';


function Nav() {
    const loc = useLocation();
    function isCurrentRoute(route) {
        return (route === loc.pathname ? true : false);
    }

    const [transparentBg, setTransparentBg] = useState(true);
    const changeNavBgColor = () => {
        if (window.scrollY > 50) {
            setTransparentBg(false);
        } else {
            setTransparentBg(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBgColor)
        return () => {
            window.removeEventListener('scroll', changeNavBgColor)
        }
    }, [])

    return (
        <nav className={ transparentBg ? 'bg-transparent' : 'bg-regular' }>
            <div className="logo">
                <i><span className="highlighted">toy</span>Shop</i>
            </div>
            <ul className="nav-links">
                <Link to='/' className="link-name">
                    <li className={ isCurrentRoute('/') ? 'active' : 'in-active' }>
                        Home
                    </li>
                </Link>
                <Link to='/popular' className="link-name">
                    <li className={ isCurrentRoute('/popular') ? 'active' : 'in-active' }>
                        Popular
                    </li>
                </Link>
                <Link to='/upcoming' className="link-name">
                    <li className={ isCurrentRoute('/upcoming') ? 'active' : 'in-active' }>
                        Upcoming
                    </li>
                </Link>
                <Link to='/cart' className="link-name">
                    <li className={ isCurrentRoute('/cart') ? 'active' : 'in-active' }>
                        Cart
                    </li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
