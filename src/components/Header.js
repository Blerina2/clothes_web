import React from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import DoHttpRequest from "../utils/DoHttpRequest";
import handlerResponse from "../utils/ResponseHandler";


const Header = () => {
    return (
        // classname here
        <div className='text-black m-5' style={{borderRadius: '40px'}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{borderRadius: '40px'}}>
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <a className="navbar-brand mt-2 mt-lg-0" href="#">Clothes</a>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="active nav-link" to="/signup"
                                      onClick={() => window.location.href = "/signup"}>Sign Up </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/signin"
                                      onClick={() => window.location.href = "/signin"}>Sign In </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="" onClick={logOut}>Log out </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

const logOut = async () => {
    await DoHttpRequest.doGetRequestWithBarerToken('/user/logout')
        .then(result => {
            toast.success('Log out successfully');
            localStorage.removeItem('token');
            handlerResponse.gotoPage('/signin');
        })
        .catch(error => {
            toast.error('Failed to log out');
            console.error(error);
        })

}
export default Header;