"use client";
import React, { FormEvent, useEffect, useState } from 'react';
import '../styles/companynamesearch.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos';
import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import NavigationOnPages from '../navOnPages';
import Footer from '../footer';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import AOS from 'aos';
import 'aos/dist/aos.css';


// Define input types
interface company {
  companyName: string;
  Status: string;
  reserveNo: string;
  RegisterDate: string;
}

const CompanySearch = () => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<company[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Number of items per page

  const handleNextStep = () => {
    if (currentPage < Math.ceil(results.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleState = () =>{
    setResults([]);
    setCurrentPage(1);
    setCurrentStep(1);
  }

  const fetchData = async () => {
   
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/companynamesearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
        console.log("The data.......", data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!companyName ) {
      // Optionally show an error message or handle the empty input case
      alert("Enter a company name.");
      return;
    }
    // Proceed with the form submission logic
    // Your existing code to handle the search
    fetchData()
  };
  

  const stepIndicators = Array.from({ length: 4 }, (_, index) => (
    <div
      key={index}
      className={`step-indicator ${index < currentStep ? 'active' : ''}`}
    ></div>
  ));

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = results.slice(startIndex, endIndex);

  useEffect(() => {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });
}, []);

  return (
    <>
      <NavigationOnPages />
      <div className="page-wrapper">
        <div className="thecontainer">
          <div className="forms-container">
            <div className="signin-signup">
             
            <form className={`sign-in-form ${currentStep !== 1 ? 'hide-form' : ''}`} method="post" onSubmit={handleSubmit}>
  <h2 className="title">Company<br /> Name Search</h2>
  <div className="input-field">
    <i className="bi bi-search"></i>
    <input
      type="text"
      name="companyName"
      id="companyName"
      placeholder='Search Here..'
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
    />
  </div>
  <div>
    <button type="submit" className="thebtn solid" disabled={loading} id="sign-up-btn">
      {loading ? 'Searching...' : 'Search'}
    </button>
  </div>
 
</form>

              {currentStep === 1 && (
                <form action="#" className="sign-up-form">
                     {results.length == 0 && (
                 
                      
                      <h2 className="title">No Results Found</h2>
                    )}
                    {results.length != 0 && (

<>
                  
                  <h2 className="title">Search Results - Page {currentPage}</h2>
                  <div className="card-container">
                    {currentItems.map((company) => (
                      <div className="card" key={company.reserveNo}>
                        <i className="bi bi-building card-icon"></i>
                        <h3 className="company-name">{company.companyName}</h3>
                        <p><i className="bi bi-check-circle-fill text-success"></i>{company.Status}</p>
                        <p>Date Registered: {company.RegisterDate.slice(0, 10)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="button-container">
                    {currentPage > 1 && (
                      <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
                        Previous
                      </button>
                    )}
                    {currentPage < Math.ceil(results.length / itemsPerPage) && (
                      <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
                        Next
                      </button>
                    )}
                  </div>
                  {/* <div className="step-indicators">{stepIndicators}</div> */}
                  </>
                    )}
                  </form>
              )}
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content"  data-aos="fade-up">
                <h1>Welcome to <br />Company Name Search</h1>
                <p>
                  Search the desired company name to find out if it is Registered or Reserved
                </p>
              </div>
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Search Another Company Name?</h3>
                <p>
                  Do you want to search for another company name? Click the back button below.
                </p>
                <button className="thebtn transparent" id="sign-in-btn" onClick={handleState}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CompanySearch;
