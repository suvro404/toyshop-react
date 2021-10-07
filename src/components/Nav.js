import { useEffect, useState } from 'react'
import {Link, useLocation } from "react-router-dom";
import '../assets/styles/Nav.css';
import {useCart} from "../context/CartContext";
import {useAuth} from "../context/AuthContext"

function Nav() {
    const loc = useLocation();
    const [transparentBg, setTransparentBg] = useState(true);
    const {cart, setCart} = useCart();
    const {authorized, setAuthorized} = useAuth();

    //console.log("authorized : ", authorized);

    function isCurrentRoute(route) {
        return (route === loc.pathname ? true : false);
    }

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

                {
                    authorized ? (
                        <div className="link-group">
                            <Link to='/cart' className="link-name">
                                <li className={ isCurrentRoute('/cart') ? 'active' : 'in-active' }>
                                    Cart{cart && cart.length > 0 && <sup>{cart.length}</sup>}
                                </li>
                            </Link>
                            <Link to='/' className="link-name">
                                <li className='in-active' onClick={() => setAuthorized(false)}>
                                    Log Out
                                </li>
                            </Link>
                        </div>
                    ):(
                        <Link to='/auth' className="link-name">
                            <li className={ isCurrentRoute('/auth') ? 'active' : 'in-active' }>
                                Log In
                            </li>
                        </Link>
                    )
                }

            </ul>
        </nav>
    );
}

export default Nav;
