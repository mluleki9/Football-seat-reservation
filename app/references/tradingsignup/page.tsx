// pages/signup.tsx
"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import '../styles/styles.css';
import React from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos'
import 'swiper/swiper-bundle.css';
import react from 'react';
import 'glightbox/dist/css/glightbox.min.css';
import NavigationOnPages from '../navOnPages';
import Footer from '../footer';


const SignUp = () => {
  const router = useRouter();

  return (
    <>
    <NavigationOnPages/>
    <div className='formstyle'>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trading and Liquor License Application Sign-Up</title>
      </Head>
      <div className="container">
        <h2><b>Trading and Liquor License Application Sign-Up</b></h2>
        <h4><b>*fields are mandatory</b></h4>
        <form>

          <label htmlFor="pin">Applicant PIN/ID* <span className="required">(required)</span></label>
          <input type="text" name="pin" id="pin" required />

          <button className="go-button" type="submit">GO</button>

          <label htmlFor="forename1">Forename* <span className="required">(required)</span></label>
          <input type="text" name="forename1" id="forename1" required />

          <label htmlFor="surname">Surname* <span className="required">(required)</span></label>
          <input type="text" name="surname" id="surname" required /> <br></br>

          <label htmlFor="address1">Postal Address* <span className="required">(required)</span></label>
          <input type="text" name="address1" id="address1" required />

          <label htmlFor="email">E-mail </label>
          <input type="text" name="email" id="email" />

          <label htmlFor="phone">Contact Number </label>
          <input type="text" name="phone" id="phone" required />

          <label htmlFor="password">Password* <span className="required">(required)</span></label>
          <input type="password" name="password" id="password" required />

          <label htmlFor="confirm_password">Confirm Password* <span className="required">(required)</span></label>
          <input type="password" name="confirm_password" id="confirm_password" required />
          
          <button className="create" type="submit">CREATE USERNAME</button>
          <button type="button" onClick={() => router.push('exit.html')}>EXIT</button>
      
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignUp;
