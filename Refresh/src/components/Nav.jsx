import { Link } from "react-router-dom";

function Nav(){
    return (
        <header>
            <nav className="Header-nav">
                <Link to="/products" className="Header-nav-link">
                    Home
                </Link>
                <Link to="/auth/login" className="Header-nav-link">
                    Authorize
                </Link>
                <Link to="/profile" className="Header-nav-link">
                    Profile
                </Link>
            </nav>
        </header>
    );
}

export default Nav;