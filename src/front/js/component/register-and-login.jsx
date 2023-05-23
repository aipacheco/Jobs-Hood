
import React from "react";
import { Link } from "react-router-dom";





const ButtonsNavbar = () => {

    return (
        <>
            <ul className="navbar-nav d-flex gap-5 me-2 mb-2 mb-lg-0">
                <Link to="/register">
                    <button type="button" className="btn-navbar"><i className="fa-solid fa-bookmark mx-1"></i> Registrarme</button>
                </Link>


                <Link to="/login">
                    <button type="button" className="btn-navbar"><i className="fa-solid fa-user mx-2 fa-lg"></i>Iniciar sesión</button>
                </Link>

            </ul>
        </>)
}


export default ButtonsNavbar;