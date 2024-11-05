"use client";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
// import styles from './styles/Navbar.module.css';
import './styles/main.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos';
import 'swiper/swiper-bundle.css';
import react from 'react';
import 'glightbox/dist/css/glightbox.min.css';
import { BiMenu, BiX } from 'react-icons/bi'; // Importing icons from react-icons

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Navigation() {

  // const [isButtonVisible, setIsButtonVisible] = useState(false);
  // const [menuActive, setMenuActive] = useState(false);


  // const toggleMenu = () => {
  //   setMenuActive(!menuActive);
  // };

  // const closeMenu = () => {
  //   setMenuActive(false);
  // };

  return (
    <>
        <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">

            <a href="index.html" className="logo d-flex align-items-center me-auto">
              
                {/* <img src="assets/img/logo.png" alt=""> */}
                <h1 className="sitename">Eswatini TB</h1>
                <span>.</span>
            </a>

            <nav id="navmenu" className="navmenu">
                <ul>
                    <li><a href="#hero" className="active">Home<br /></a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#team">Team</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li className="dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                            <li><a href="#">Dropdown 1</a></li>
                            <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><a href="#">Deep Dropdown 1</a></li>
                                    <li><a href="#">Deep Dropdown 2</a></li>
                                    <li><a href="#">Deep Dropdown 3</a></li>
                                    <li><a href="#">Deep Dropdown 4</a></li>
                                    <li><a href="#">Deep Dropdown 5</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Dropdown 2</a></li>
                            <li><a href="#">Dropdown 3</a></li>
                            <li><a href="#">Dropdown 4</a></li>
                        </ul>
                    </li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>


        </div>
    </header>
    </>
  )
}
