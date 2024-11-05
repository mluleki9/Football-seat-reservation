"use client";
import Image from "next/image"
import '../styles/style.css';
import Head from "next/head";
import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos'
import 'swiper/swiper-bundle.css';
import react from 'react';
import 'glightbox/dist/css/glightbox.min.css';
import Script from 'next/script';
import Footer from "../footer";
import Navigation from "../nav";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

////////////////////////////////////////////////// HOME PAGE START /////////////////////////////////////////////////////////
export default function Home() {

  ///////////////////////// SESSION TRACKING ////////////////////
  const [isCookieSet, setIsCookieSet] = useState(false);

  useEffect(() => {
    // Check if the cookie is set
    const applID = Cookies.get('applID');
    if (applID) {
      setIsCookieSet(true);
    } 
  }, []);

  /////////////////////////////////////////////////////////////
  
  return (
    <>

    <head>
    <meta charSet="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <link rel="shortcut icon" href="favicon.png"></link>
    </head>
    

<body>

    
   <Navigation/>

    <section id="home" className="d-flex flex-column justify-content-center align-items-center">
        <div className="container" data-aos="fade-in">
            <h1>Welcome To Eswatini <br></br>Online Government Services</h1>
            <h2>We are an automated, online platform that allows you to access <br></br> Eswatini Government Services </h2>

        </div>
    </section>

    <main id="main">

       
        <section id="business_section" className="business_section">
            <div className="container">

                <div className="row">
                    <div className="col-xl-4 col-lg-5" data-aos="fade-up">
                        <div className="content">

                            <h3>Trading <br />Licence & Liquor </h3>
                            <p>
                                Need a business permit or license? Our Trading & Licences section has you covered. Here, you will find resources to start or run a business, apply for new or renew existing licenses, and access regulations to ensure you are compliant.
                            </p>
                            <div className="text-center">
                                <a href="/" className="click-here-button3">CLICK HERE</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7 d-flex">
                        <div className="icon-boxes d-flex flex-column justify-content-center">
                            <div className="row">
                               
                                <div className="col-xl-4 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <i className="bi bi-search"></i>
                                        <h4>Company<br /> Name Search</h4>
                                        <p>Check to see if your desired business name is already officially registered with the government.</p>
                                        <div className="text-center">
                                            <a href="/companynamesearch" className="click-here-button">SEARCH</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <i className="bi bi-laptop"></i>
                                        <h4>Company <br />Name Reserve</h4>
                                        <p>This lets you hold your preferred name for a limited time, while you complete the registration process.</p>
                                        <div className="text-center">
                                        {!isCookieSet ? (
                                            <Link href="/newcompanyreservation"  className="click-here-button">RESERVE</Link>
                                            ) : (
                                                <Link href="/newcompanyreservation" className="click-here-button">RESERVE</Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <i className="bi bi-clipboard2-check"></i>
                                        <h4>Company Registration </h4>
                                        <p>Officially establish your company with the government. Your company will be officially recognized.</p>
                                        <div className="text-center">
                                        {!isCookieSet ? (
                                            <Link href="/compregistration"  className="click-here-button">REGISTER</Link>
                                            ) : (
                                                <a href="/compregistration" className="click-here-button">REGISTER</a>
                                            )}
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>


        
        <section id="citizen_section" className="citizen_section section-bg">
            <div className="container">

                <div className="section-title" data-aos="fade-up">
                    <h2>Citizen Services</h2>
                    <p>This section provides convenient access to various citizen services. You can track the application status of your travel documents, such as passports and visas, or check the progress of your identity card application, renewal, or replacement.</p>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-6" data-aos="fade-up">
                        <div className="icon-box">
                            <div className="icon"><i className="bi bi-passport"></i></div>
                            <h4 className="title"><a href="">Passport Status</a></h4>
                            <p className="description">This option allows you to see the progress of your passport application.Click the button below and enter your details to find out.</p>
                            <div className="text-center">
                                <a href="/passportstatus" className="click-here-button2">CHECK STATUS</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                        <div className="icon-box">
                            <div className="icon"><i className="bi bi-airplane"></i></div>
                            <h4 className="title"><a href="">Travel Document Status</a></h4>
                            <p className="description">This option allows you to track the progress of your travel document application, such as a passport or visa. Enter your details to find out.</p>
                            <div className="text-center">
                                <a href="/checktraveldoc" className="click-here-button2">CHECK STATUS</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div className="icon-box">
                            <div className="icon"><i className="bi bi-person"></i></div>
                            <h4 className="title"><a href="">Identity Card Status</a></h4>
                            <p className="description">This option allows you to track the progress of your identity card application, renewal, or replacement.</p>
                            <div className="text-center">
                                <a href="idstatus" className="click-here-button2">CHECKS STATUS</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
        

<Footer/>

    </main>
    

    </body>
    </>
  );
}
