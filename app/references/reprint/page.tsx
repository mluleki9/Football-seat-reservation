"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
 import '../styles/compregistration.css';

// import '../styles/styles.css';
import React, { ChangeEvent, useEffect,useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos';
import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import Footer from '../footer';
import NavigationOnPages from '../navOnPages';
import Image from 'next/head'
import Link from 'next/link';
import cookie from 'js-cookie';

interface company {
  reservedName: string;
  Status:string;
  reservedNo:string;
  RegisterDate:string;
  applSurname:string;
  nationality:string;
  email:string;
  applForename1:string;
  applForename2:string;
  applPassport:string;
  applAddr1:string;
  applPIN: string;


}

const CompanyRegistration = () => {
  const router = useRouter();
  const totalSteps = 4; // Total number of steps
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedValue,setSelectedValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Partial<company>>({});

  //GETTING SELECTED VALUE FROM DROPDOWN


const value = cookie.get('applID');
console.log("rrrrrrrrrrrrrrrrrr  ", value)

//////////////////DROPDOWN SELECT CHECK 

// const getSelectedValue = (): string => {
//   const selectElement = document.getElementById('action') as HTMLSelectElement;
//   return selectElement.value;
// };
// useEffect(() => {
//   setSelectedValue(getSelectedValue());
// }, []);
//////////////////DROPDOWN SELECT CHECK 


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

  const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("mmmmmlmlmlmm",value);
    try {
      const response = await fetch('http://localhost:5001/companyRegPrint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        console.log("The data.......",data);
        
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    setLoading(false);
  };
  
  // const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const selectedReserveNo = event.target.value;
  //   //console.log("Selected Company111111111111: ", selectedReserveNo);
  //   const selectedCompany = results.find(company => company.reservedNo === selectedReserveNo);
  //   // console.log("Selected Company:", selectedCompany);
  //   setSelectedCompany(selectedCompany || {});
  // };
  
  //SERVER CODE
  ////////////////////////////////////////////////////////////////////////////////////////////

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
        <title>Company Registration</title>
      </Head>
      <NavigationOnPages/>
<div className="page-wrapper">
    
  
      <div className="thecontainer">
        <div className="forms-container">
          <div className="signin-signup">
          <div className="step-indicators">{stepIndicators}</div>
            <form className={`sign-in-form ${currentStep !== 1 ? 'hide-form' : ''}`} onSubmit={fetchData}>

            <div className="input-field">
  <i className="bi bi-credit-card"></i>
  <div className="dropdown-container">
  <select className="dropdown" name="selectName" id="selectName" >
  <option value="" disabled selected hidden>
      {selectedCompany.reservedName|| '  Select Reserved Name'}
      </option>
      {results.map((name, index) => (
                <option key={index} value={name.reservedNo}>{name.reservedName}</option>
              ))}
      {/* Add more options as needed */}
    </select>
    <i className="dropdown-arrow"></i>
  </div>
</div>
              
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" placeholder="Reserve Name" />
              </div>
              <div className="input-field">
                <i className="bi bi-calendar"></i>
                <input type="text" placeholder="Application Date" />
              </div>

              <div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" placeholder="Application's Name" />
              </div>

              <div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" placeholder="Application's Surname" />
              </div>

              
              <input type="submit" value="Print" id="sign-up-btn" className="thebtn solid" />
             
            </form>
            {currentStep === 1 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Reprint Details</h2>
                  
                  <div className="input-field">
  <i className="bi bi-credit-card"></i>
  <div className="dropdown-container">
    <select className="dropdown">
      <option value="" disabled selected hidden>
        Select Reserved Name
      </option>
      <option></option>
      {/* Add more options as needed */}
    </select>
    <i className="dropdown-arrow"></i>
  </div>
</div>

                  <div className="input-field">
                    <i className="bi bi-123"></i>
                    <input type="text" placeholder="Reserve Number" />
                  </div>
                  
                  <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
                    Next
                  </button>
                </form>
              )}
              {currentStep === 2 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Reprint Details</h2>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Applicant Name" />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Forenames" />
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
                  <h2 className="title">Reprint Details</h2>
                  <div className="input-field">
                    <i className="bi bi-passport"></i>
                    <input type="text" placeholder="Applicant PIN" />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-passport"></i>
                    <input type="text" placeholder="Passport No." />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Applicant's Country" />
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
    <h2 className="title">Reprint Details</h2>
    <div className="input-field">
      <i className="bi bi-envelope"></i>
      <input type="text" placeholder="Email" />
    </div>
    <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Address" />
                  </div>
                  <div className="button-container">
          <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
          Previous
          </button>

  
    <Link href="/newcompregistration">
    <input type="submit" className="thebtn next-btn" value="Register"  onClick={handleSubmit} />
  </Link>
</div>


  </form>

)}
                  
          </div>
        </div>
        

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h1>Company Name Registration Reprint Page</h1>
              <p>
               Legally register your desired company. Inoder to for your business to have legal protection.
              </p>
              
            </div>
            <div className="image">
             <Image src="/log.svg" width={100} height={100} alt="" />     
             </div>
                    </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already Signed Up ?</h3>
              <p>
                If you are already signed in and having an existing account, kindly click the sign in button below.
              </p>
              <button className="thebtn transparent" id="sign-in-btn">
                Exit
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

export default CompanyRegistration;