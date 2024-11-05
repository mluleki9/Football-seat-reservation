"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
 import '../styles/tradingandliquor.css';
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

const TradingLicenceandLiquor = () => {
  const router = useRouter();
  const totalSteps = 4; // Total number of steps
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

              <div className="input-field">
              <i className="bi bi-credit-card"></i>
  <div className="dropdown-container">
    <select className="dropdown">
      <option value="" disabled selected hidden>
        License Type
      </option>
      <option value="licenceone">Trading License Application</option>
      <option value="licencetwo">Liquor License Application</option>
      {/* Add more options as needed */}
    </select>
    <i className="dropdown-arrow"></i>
  </div>
</div>

<div className="input-field">
  <i className="bi bi-credit-card"></i>
  <div className="dropdown-container">
    <select className="dropdown">
      <option value="" disabled selected hidden>
        Action
      </option>
      <option value="licenceone">New Application</option>
      <option value="licencetwo">Continue Application</option>
      <option value="licencethree">Re-Print</option>
      {/* Add more options as needed */}
    </select>
    <i className="dropdown-arrow"></i>
  </div>
</div>
              <Link href="">
              <input type="submit" value="Login" className="thebtn solid" />
              </Link>
             
            </form>
            {currentStep === 1 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Sign up - Step 1</h2>
                  
                 
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
                    <input type="text" placeholder="Surname" />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Postal Address" />
                  </div>
                  <div className="button-container">
  <button type="button" className="thebtn" onClick={handlePreviousStep}>
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
      <i className="bi bi-envelope"></i>
      <input type="text" placeholder="Email" />
    </div>
    <div className="input-field">
      <i className="bi bi-telephone"></i>
      <input type="text" placeholder="Contact Number" />
    </div>
    
    <div className="button-container">
  <button type="button" className="thebtn" onClick={handlePreviousStep}>
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
      <i className="bi bi-person"></i>
      <input type="text" placeholder="Username" />
    </div>
    <div className="input-field">
      <i className="bi bi-key"></i>
      <input type="password" placeholder="Password" />
    </div>
    <div className="input-field">
      <i className="bi bi-key"></i>
      <input type="text" placeholder="Confirm Password" />
    </div>

    <div className="button-container">
  <button type="button" className="thebtn" onClick={handlePreviousStep}>
    Previous
  </button>
  <input type="submit" className="thebtn next-btn" value="Create" onClick={handleSubmit} />

</div>              
                </form>
              )}
          </div>
        </div>
        

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h1>Trading Licence and Liquor</h1>
              <p>
               Get to apply for a new, or continue applying and reprinting your trading and liquor licence
              </p>
              <h2>
                <p>Do not have an account? click button below to Sign Up</p>
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

export default TradingLicenceandLiquor;
