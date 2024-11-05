"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
 import '../styles/compnamereserv.css';
// import '../styles/styles.css';
import React, { useEffect,useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos';
import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import Footer from '../footer';
import NavigationOnPages from '../navOnPages';
import Image from 'next/head'
import Link from 'next/link';

const CompanyNameReservation = () => {
  const router = useRouter();
  const totalSteps = 5; // Total number of steps
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const stepIndicators = Array.from({ length: totalSteps }, (_, index) => (
    <div
      key={index}
      className={`step-indicator ${index < currentStep ? 'active' : ''}`}
    ></div>));
  

  useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".thecontainer");

    if (sign_in_btn && sign_up_btn && container) {
      const handleSignUpClick = () => {
        if (container) {
          container.classList.add("sign-up-mode");
        }
      };

      const handleSignInClick = () => {
        if (container) {
          container.classList.remove("sign-up-mode");
        }
      };

      sign_up_btn.addEventListener("click", handleSignUpClick);
      sign_in_btn.addEventListener("click", handleSignInClick);

      // Cleanup event listeners on unmount
      return () => {
        sign_up_btn.removeEventListener("click", handleSignUpClick);
        sign_in_btn.removeEventListener("click", handleSignInClick);
      };
    }
  }, []);

  return (
    <>
  
      <Head>
        <title>Company Name Reservation</title>
      </Head>
      <NavigationOnPages/>
<div className="page-wrapper">
    
  
      <div className="thecontainer">
        <div className="forms-container">
          <div className="signin-signup">
          <div className="step-indicators">{stepIndicators}</div>
            <form className={`sign-in-form ${currentStep !== 1 ? 'hide-form' : ''}`} onSubmit={handleSubmit}>
              <h2 className="title">Sign in</h2>
              
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="bi bi-key"></i>
                <input type="password" placeholder="Password" />
              </div>
              <Link href="/newcompanyreservation">
              <input type="submit" value="Login" className="thebtn solid" />
              </Link>
             
            </form>
            {currentStep === 1 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Sign up - Step 1</h2>
                  
                  <div className="input-field">
                    <i className="bi bi-flag"></i>
                    <select className="dropdown">
                      <option value="" disabled >
                        Select Nationality
                      </option>
                      <option value="country1">Eswatini</option>
                      <option value="country2">South Africa</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div className="input-field">
                    <i className="bi bi-person-badge"></i>
                    <input type="text" placeholder="Applicant ID" />
                  </div>
                  
                  <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
                  Next
                  </button>
                </form>
              )}
              {currentStep === 2 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Sign up - Step 2</h2>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Forename One" />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Forename Two" />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Surname" />
                  </div>
                  <div className="button-container">
  <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
    Previous
  </button>
  <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
    Next
  </button>
</div>
                </form>
)}

{currentStep === 3 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Sign up - Step 3</h2>
                  <div className="input-field">
                    <i className="bi bi-passport"></i>
                    <input type="text" placeholder="Passport No." />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Address" />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Address" />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Address" />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Address" />
                  </div>
                  <div className="button-container">
  <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
    Previous
  </button>
  <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
    Next
  </button>
</div>
                </form>
)}
{currentStep === 4 && (
  <form action="#" className="sign-up-form">
    <h2 className="title">Sign up - Step 4</h2>
    <div className="input-field">
      <i className="bi bi-envelope"></i>
      <input type="text" placeholder="Email" />
    </div>
    <div className="input-field">
      <i className="bi bi-telephone"></i>
      <input type="text" placeholder="Telephone Number" />
    </div>
    <div className="input-field">
      <i className="bi bi-phone"></i>
      <input type="text" placeholder="Cellphone Number" />
    </div>

    <div className="input-field">
      <i className="bi bi-printer"></i>
      <input type="text" placeholder="Fax Number" />
    </div>
    <div className="button-container">
  <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
    Previous
  </button>
  <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
    Next
  </button>
</div>
  </form>

)}
                  



 {currentStep === 5 && (
  <form action="#" className="sign-up-form">
    <h2 className="title">Sign up - Step 5</h2>
    <div className="input-field">
      <i className="bi bi-person"></i>
      <input type="text" placeholder="Username" />
    </div>
    <div className="input-field">
      <i className="bi bi-key"></i>
      <input type="password" placeholder="Password" />
    </div>
    <div className="input-field">
      <i className="bi bi-key"></i>
      <input type="text" placeholder="Password" />
    </div>
    <div className="button-container">
    <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
    Previous
  </button>
  <input type="submit" className="thebtn next-btn" value="Sign up" onClick={handleSubmit} />
</div>
                </form>
              )}
          </div>
        </div>
        

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h1>Company Name Reservation</h1>
              <p>
              Guarantee your ideal company name with our reservation service.<br /> Lock in brand exclusivity for a smooth business formation process.
              </p>
              <h2>
                <p>Do not have an account? Click the button below to Sign Up</p>
              </h2>
              <button className="thebtn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <div className="image">
             <Image src="/log.svg" width={100} height={100} alt="" />     
             </div>
                    </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already Signed Up ?</h3>
              <p>
                If you ae already signed in and having an existing account, kindly click the sign in button below.
              </p>
              <button className="thebtn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <Image src="/register.svg" className="image" width={20} height={20} alt="" /> 
          </div>
        </div>
      </div>
      
            <Footer/>
      
</div>
 
    </>
  );
};

export default CompanyNameReservation;
