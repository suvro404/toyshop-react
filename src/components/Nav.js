import { useEffect, useState } from 'react'
import {Link, useLocation } from "react-router-dom";
import '../assets/styles/Nav.css';
import {useCart} from "../context/CartContext";
import {useAuth} from "../context/AuthContext"

function Nav() {
    const loc = useLocation();
    const [transparentBg, setTransparentBg] = useState(true);
    const {products} = useCart();
    const {authorized, setAuthorized, setCredential} = useAuth();

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

    function logout() {
        setAuthorized(false);
        setCredential({});
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBgColor)
        return () => {
            window.removeEventListener('scroll', changeNavBgColor)
        }
    }, []);

    return (
        <nav className={ transparentBg ? 'bg-transparent' : 'bg-regular' }>
            <div className="logo">
                <i><span className="highlighted">toy</span>Shop</i>
            </div>
            <ul className="nav-links">
                <Link to={process.env.PUBLIC_URL + '/'} className="link-name">
                    <li className={ isCurrentRoute('/') ? 'active' : 'in-active' }>
                        Home
                    </li>
                </Link>
                <Link to={process.env.PUBLIC_URL + '/popular'} className="link-name">
                    <li className={ isCurrentRoute('/popular') ? 'active' : 'in-active' }>
                        Popular
                    </li>
                </Link>
                <Link to={process.env.PUBLIC_URL + '/upcoming'} className="link-name">
                    <li className={ isCurrentRoute('/upcoming') ? 'active' : 'in-active' }>
                        Upcoming
                    </li>
                </Link>

                {
                    authorized ? (
                        <div className="link-group">
                            <Link to={process.env.PUBLIC_URL + '/cart'} className="link-name">
                                <li className={ isCurrentRoute('/cart') ? 'active' : 'in-active' }>
                                    Cart{products && products.length > 0 && <sup>{products.length}</sup>}
                                </li>
                            </Link>
                            <Link to={process.env.PUBLIC_URL + '/'} className="link-name">
                                <li className='in-active' onClick={() => logout()}>
                                    Log Out
                                </li>
                            </Link>
                        </div>
                    ):(
                        <Link to={process.env.PUBLIC_URL + '/auth'} className="link-name">
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
