import Image from "next/image"
import './styles/style.css';
import Head from "next/head";
import Link from "next/link";

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos'
import 'swiper/swiper-bundle.css';
import react from 'react';
import 'glightbox/dist/css/glightbox.min.css';

export default function Footer() {
  return (
    <footer id="footer">



    <div className="container d-lg-flex py-4">
    
        <div className="me-lg-auto text-center text-lg-start">
            <div className="copyright">
                &copy; Copyright <strong><span>ESWATINI GOVERNMENT</span></strong>. All Rights Reserved
            </div>
    
        </div>
        <div className="social-links text-center text-lg-right pt-3 pt-lg-0">
            <a href="https://twitter.com/EswatiniGovern1" className="twitter"><i className="bi bi-twitter"></i></a>
            <a href="www.facebook.com/EswatiniGov/" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/eswatini_government/" className="instagram"><i className="bi bi-instagram"></i></a>
           <a href="https://www.linkedin.com/company/eswatini-government?originalSubdomain=sz" className="linkedin"><i className="bi bi-linkedin"></i></a>
        </div>
    </div>
    </footer>
  )
}
