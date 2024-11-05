'use client';

import Image from "next/image";
import Link from "next/link";
import styles from './styles/Navbar.module.css';
import './styles/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos';
import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import { BiMenu, BiX } from 'react-icons/bi'; // Importing icons from react-icons

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function NavigationOnPages() {
    const [isCookieSet, setIsCookieSet] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        // Check if the cookie is set
        const applID = Cookies.get('applID');
        if (applID) {
            setIsCookieSet(true);
        } 
    }, []);

    const handleIconClick = () => {
        setIsButtonVisible(!isButtonVisible);
    };

    const logoutFunction = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent the default action if necessary
        event.preventDefault();

        // Remove the cookie
        Cookies.remove('applID');

        // Redirect the user to the sign-in/sign-up page
        window.location.href = '/signinsignup';
    };

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const closeMenu = () => {
        setMenuActive(false);
    };

    return (
        <>

            <header id="header" className="d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <Image src="/logo.png" alt="govlogo" height={50} width={70} />
                    </div>

                    <nav id="navbar" className={`${styles.navbar} ${menuActive ? styles.navbarMobile : ''}`}>
                        <ul className={menuActive ? styles.active : ''}>
                            <li><Link className="nav-link scrollto active" href="/#home">Home</Link></li>
                            <li><Link className="nav-link scrollto" href="/#business_section">Business</Link></li>
                            <li><Link className="nav-link scrollto" href="/#citizen_section">Citizen</Link></li>
                            {!isCookieSet ? (
                                <li>
                                    <Link className="nav-link scrollto" href="/signinsignup">Sign In</Link>
                                </li>
                            ) : (
                                <li>
                                    <div className="icon-wrapper" onClick={handleIconClick}>
                                        <i className="bi bi-person-circle"></i>
                                    </div>
                                    {isButtonVisible && (
                                        <button className="scrollto" id="atwo" onClick={logoutFunction}>Log Out</button>
                                    )}
                                </li>
                            )}
                        </ul>
                        <div className={`${styles.mobileNavToggle}`} onClick={toggleMenu}>
                            {menuActive ? <BiX /> : <BiMenu />}
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}
