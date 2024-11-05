'use client';

import Head from "next/head";
import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'glightbox/dist/css/glightbox.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/css/main.css';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';

type Match = {
  id: number;
  match_name: string;
  date: string;
  location: string;
  available_slots: string
  ;
  status: string;
};

export default function HomePage() {
  const { isSignedIn, user } = useUser();
  const [matches, setMatches] = useState<Match[]>([]);
  const [reservationCount, setReservationCount] = useState(1);


  useEffect(() => {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });
}, []);

// Fetch all available matches from server starts//
useEffect(() => {
  const fetchMatches = async () => {
    const res = await fetch('http://localhost:5001/matches')
    const data = await res.json();
    setMatches(data)
  };
  fetchMatches();
}, []);
// Fetch all available matches from server ends//

// Handling user match reservation starts //
const handleReserve = async (e: React.MouseEvent<HTMLButtonElement>, match: Match,reservationCount: number) => {
  e.preventDefault();

  if (!isSignedIn) {
     window.location.href="/sign-in";
  }else{
    const reservationDetails = {
    matchId: match.id,
    userId: user?.id,
    username:user?.username,
    userEmail: user?.emailAddresses[0].emailAddress,
  };

  try {
    const response = await fetch('http://localhost:5001/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationDetails )
    });

    if (response.status === 404) {
       alert('Match no longer available');
    } else if (response.status === 400) {
      alert('Sorry, No available seats');
    } else if (response.status === 200) {
      alert('Reservation successful!');
    } else {
      alert('An unexpected error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Error making reservation:', error);
    alert('An error occurred. Please try again.');
  }}
};
// Handling user match reservation ends //


//////////////////////////////////////////////////////// HTML HOMEPAGE STARTS ////////////////////////////////////////////////////
    return (
    <>
    <Head>
    <meta charSet="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>

    
    <Link href="https://fonts.googleapis.com" rel="preconnect"/>
    <Link href="https://fonts.gstatic.com" rel="preconnect"/>
    <Link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"/>
    </Head>

<body className="index-page">

<header id="header" className="header d-flex align-items-center position-relative">
  <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

    <a href="index.html" className="logo d-flex align-items-center">
      
      <img src="/football.png" alt="AgriCulture"/>
     <h1 className="sitename">Football Seat Reservation</h1> 
    </a>

    <nav id="navmenu" className="navmenu">
      <ul>
        <li><a href="#hero" className="active">Home</a></li>
        <li><a href="#blog-posts-2">Matches</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#footer">Contact</a></li>
        <li className="dropdown">
                {isSignedIn ? (
                  // Show UserButton dropdown with Logout if user is signed in
                  <>
                     
                     <UserButton /> {/* Clerk component for user profile and signout */}

                  </>
                ) : (
                  // Show SignInButton if user is not signed in
                  <SignInButton>
                    <a href="#">Sign In</a>
                  </SignInButton>
                )}
              </li>
      </ul>
      <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
    </nav>
  </div>
</header>
<main className="main">

 
  <section id="hero" className="hero section dark-background">

    <div id="hero-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">

      <div className="carousel-item active">
        <img src="/background.jpg" alt=""/>
        <div className="carousel-container">
          <h2>Experience the Thrill of the Game</h2> 
           <h3> Book Your Next Match Today!</h3>
          <p>Register to reserve your seat for the next big match, don't miss out!</p>
        </div>
      </div>
    </div>

  </section>
  <section id="blog-posts-2" className="blog-posts-2 section">
      <div className="container section-title">
        <h1 className="section-title">UPCOMING MATCHES</h1>
        <p>Below are some of the upcoming matches and reserve yourself a seat</p>
      </div>

      <div className="container1">
        <div className="row gy-4">
          {matches.map((match) => (
            <div className="col-lg-4" key={match.id}>
              <article className="">

                <div className="meta d-flex align-items-end">
                  <span className="post-date">
                    <span>{new Date(match.date).getDate()}</span>
                    {new Date(match.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt"></i>
                    <span className="ps-2">{match.location}</span>
                  </div>
                  <span className="px-3 text-black-50">/</span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock"></i>
                    <span className="ps-2">{match.date}</span>
                  </div>
                </div>

                <div className="post-content d-flex flex-column">
                  <h3 className="post-title">{match.match_name}</h3>
                  <p>
                    <button onClick={(e) => handleReserve(e, match, reservationCount)} className="reserve-button">
                      RESERVE
                    </button>
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>


    <div className="container">
      <div className="row gy-4 justify-content-between align-items-center">
        <div className="col-lg-6 order-lg-2 position-relative" data-aos="zoom-out">
        <h3 className="post-title">Sign Up to recieve Daily Mail</h3>
        <p>< Link href="/sign-in" className="btn-cta">Recieve Mail</Link></p>
        </div>
        <div id="about"className="col-lg-5 order-lg-1" data-aos="fade-up" data-aos-delay="100" >
          <h2 className="content-title mb-4">About Us</h2>
          <p className="mb-4">
Welcome to Football Online, your ultimate destination for booking and reserving football matches with ease. Whether you’re a player looking to secure a spot for your team or a fan wanting to reserve tickets for the next big game, we’ve got you covered. Our platform is designed to streamline the reservation process, providing real-time updates on available matches, venues, and time slots.

We are passionate about bringing the football community together by making it easier for everyone to enjoy the game. With a focus on simplicity, convenience, and a user-friendly experience, Football Online ensures that booking your next football match is just a few clicks away. Join us and be part of the excitement!
          </p>
          <p>< Link href="/sign-in" className="btn-cta">Get in touch</Link></p>
        </div>
      </div>
    </div>
    <footer id="footer" className="footer dark-background">

<div className="copyright text-center">
  <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">

    <div className="d-flex flex-column align-items-center align-items-lg-start">
      <div>
        © Copyright <strong><span>2024</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
       
        Designed by <a href="https://bootstrapmade.com/">Mluleki Dlamini</a>
      </div>
    </div>

    <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
      <a href=""><i className="bi bi-twitter-x"></i></a>
      <a href=""><i className="bi bi-facebook"></i></a>
      <a href=""><i className="bi bi-instagram"></i></a>
      <a href=""><i className="bi bi-linkedin"></i></a>
    </div>

  </div>
</div>
</footer>
  </main>
    
    <script src="/scripts/aos/aos.js"></script>
    <script src="/scripts/glightbox/js/glightbox.min.js"></script>
    <script src="/scripts/swiper/swiper-bundle.min.js"></script>
    <script src="/scripts/purecounter/purecounter_vanilla.js"></script>
    <script src="/scripts/imagesloaded/imagesloaded.pkgd.min.js"></script>
    <script src="/scripts/isotope-layout/isotope.pkgd.min.js"></script>
    
   
    <script src="/scripts/main.js" async></script>
    

    </body> 
    </>
 
  );
}

//////////////////////////////////////////////////////// HTML HOMEPAGE STARTS ////////////////////////////////////////////////////
function then(arg0: (res: any) => any) {
  throw new Error("Function not implemented.");
}

