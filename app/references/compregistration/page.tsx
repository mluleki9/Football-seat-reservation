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

interface companyPrint {
  ReserveNumber: string;
  CompanyName:string;
  ApplicantName:string;
  RegistrationDate:string;
  ApplicantSurname: string;
  ApplicantForename : string;
  ProvisionalCIN : string;
  ReceiptNumber : string;
  CompanyType : string;
  CompanyObjective : string;
  CompanyPostalAdress : string;
  CompanyPhysicalAddress : string;
}

const CompanyRegistration = () => {
  const router = useRouter();
  const totalSteps = 4; // Total number of steps
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedValue,setSelectedValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<company[]>([]);
  const [resultsprint, setResultsPrint] = useState<companyPrint[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Partial<company>>({});
  const [selectedCompanyPrint, setSelectedCompanyPrint] = useState<Partial<companyPrint>>({});
//GETTING SELECTED VALUE FROM DROPDOWN


const value = cookie.get('applID');
console.log("rrrrrrrrrrrrrrrrrr  ", value)

//////////////////DROPDOWN SELECT CHECK 

const getSelectedValue = (): string => {
  const selectElement = document.getElementById('action') as HTMLSelectElement;
  return selectElement.value;
};
useEffect(() => {
  setSelectedValue(getSelectedValue());
}, []);

//////////////////DROPDOWN SELECT CHECK 


const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  console.log("mmmmmlmlmlmm",value);
  try {

    if(selectedValue== "new"){
    const response = await fetch('http://localhost:5001/companyReg', {
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
  }

  //
  else{

    const response = await fetch('http://localhost:5001/companyRegPrint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });

    if (response.ok) {
      const data = await response.json();
      const formData = {data}
      setResultsPrint(data);
      console.log("The data.......",data);

      // const query = new URLSearchParams(formData as any).toString();
      //       router.push(`/PdfReprint?${query}`);
      
    } else {
      console.error('Failed to fetch data');
    }
  }
  } catch (error) {
    console.error('Error:', error);
  }

  setLoading(false);
};

const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
  const selectedReserveNo = event.target.value;
  //console.log("Selected Company111111111111: ", selectedReserveNo);
  const selectedCompany = results.find(company => company.reservedNo === selectedReserveNo);
  // console.log("Selected Company:", selectedCompany);
  setSelectedCompany(selectedCompany || {});
};

const handleSelectChangePrint = (event: ChangeEvent<HTMLSelectElement>) => {
  const selectedReserveNo = event.target.value;
  //console.log("Selected Company111111111111: ", selectedReserveNo);
  const selectedCompany = resultsprint.find(company => company.ReserveNumber === selectedReserveNo);
  // console.log("Selected Company:", selectedCompany);
  setSelectedCompanyPrint(selectedCompany || {});
};


const handleSubmit = () => {

  try {
    // Ensure selectedCompany is defined
    if (!selectedCompany) {
      console.error('selectedCompany is not defined');
      return;
    }

    // Set the "selectedCompany" cookie
    cookie.set('selectedData', JSON.stringify(selectedCompany), { path: '/compreg3' });
    console.log('Cookie set successfully');

  } catch (error) {
    console.error('Error during handleSubmit:', error);
  }
};
//SERVER CODE
////////////////////////////////////////////////////////////////////////////////////////////


const handlePrint = () => {
  const ApplicantName = selectedCompanyPrint.ApplicantName;
  const ApplicantForename = selectedCompanyPrint.ApplicantForename;
  const ApplicantSurname = selectedCompanyPrint.ApplicantSurname;
  const CompanyName = selectedCompanyPrint.CompanyName;
  const ProvisionalCIN = selectedCompanyPrint.ProvisionalCIN;
  const ReceiptNumber = selectedCompanyPrint.ReceiptNumber;
  const CompanyType = selectedCompanyPrint.CompanyType;
  const  CompanyObjective = selectedCompanyPrint.CompanyObjective;
  const CompanyPostalAdress = selectedCompanyPrint.CompanyPostalAdress;
  const CompanyPhysicalAddress = selectedCompanyPrint.CompanyPhysicalAddress;


  const formData = {      
    ApplicantName,
    ApplicantForename,
    ApplicantSurname,
    CompanyName,
    ProvisionalCIN,
    ReceiptNumber,
    CompanyType,
    CompanyObjective,
    CompanyPostalAdress,
    CompanyPhysicalAddress,}

  if (selectedCompanyPrint.ReserveNumber != ''){
      
  const query = new URLSearchParams(formData as any).toString();
  // router.push(`/PdfReprint?${query}`);
  window.open(`/PdfReprint?${query}`, '_blank', 'noopener,noreferrer');

  }

}


  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);

  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
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
        <title>Company Registration</title>
      </Head>
      <NavigationOnPages/>
<div className="page-wrapper">
    
  
      <div className="thecontainer">
        <div className="forms-container">
          <div className="signin-signup">
         
          <form className={`sign-in-form ${currentStep !== 1 ? 'hide-form' : ''}`}  onSubmit={fetchData} >
              <h2 className="title">Select Action</h2>
              
              <div>
             <input type="hidden" placeholder="Username" />
          <input type="hidden" placeholder="Password" />
              </div>

              <div className="input-field">
  <i className="bi bi-credit-card"></i>
  <div className="dropdown-container">
  <select name="action" id="action" className="dropdown" onChange={(e) => setSelectedValue(e.target.value)} value={selectedValue}>
      <option value="" disabled selected hidden>
        Action
      </option>
      <option value="new" className="dropdown">New Registration</option>
              <option value="reprint" className="dropdown">Re-Print</option>
      {/* Add more options as needed */}
    </select>
    <i className="bi bi-chevron-down dropdown-arrow"></i>
  </div>
</div>

              
              <input type="submit" value="Submit" id="sign-up-btn" className="thebtn solid" />
              
             
            </form>
            {selectedValue === "new" && (
              <>
            {currentStep === 1 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">New Registration</h2>
                  
                  <div className="input-field">
  <i className="bi bi-credit-card"></i>
  <div className="dropdown-container">
  <select className="dropdown" name="selectName" id="selectName" onChange={handleSelectChange}>
  <option value="" disabled selected hidden>
      {selectedCompany.reservedName|| '  Select Reserved Name'}
      </option>
      {results.map((name, index) => (
                <option key={index} value={name.reservedNo}>{name.reservedName}</option>
              ))}
      {/* Add more options as needed */}
    </select>
    <i className="bi bi-chevron-down dropdown-arrow"></i>
  </div>
</div>

                  <div className="input-field">
                    <i className="bi bi-123"></i>
                    <input type="text" placeholder="Reserve Number" name="reserveNumber" id="reserveNumber" value={selectedCompany.reservedNo || ''}  readOnly/>
                  </div>
                  
                  <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
                    Next
                  </button>
                </form>
              )}
           {currentStep === 2 && (
                <form action="#" method='POST' className="sign-up-form">
                  <h2 className="title">New Registration</h2>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Applicant Name" name="applicantName" id="applicantName" value={selectedCompany.applForename1?.charAt(0).toUpperCase() + (selectedCompany.applForename1?.substring(1)?.toLowerCase() || '')}/>
                  </div>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Forenames" name="forenames" id="forenames" value={selectedCompany.applForename2?.charAt(0).toUpperCase() + (selectedCompany.applForename2?.substring(1)?.toLowerCase() || '')} />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Surname" name="surname" id="surname" value={selectedCompany.applSurname?.charAt(0).toUpperCase() + (selectedCompany.applSurname?.substring(1)?.toLowerCase() || '')}/>
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
                  <h2 className="title"> New Registration</h2>
                  <div className="input-field">
                    <i className="bi bi-passport"></i>
                    <input type="text" placeholder="Applicant PIN" name="applicantPIN" id="applicantPIN" value={selectedCompany.applPIN|| ''} />
                  </div>
                  <div className="input-field">
                    <i className="bi bi-passport"></i>
                    <input type="text" placeholder="Passport No." name="passportNumber" id="passportNumber" value={selectedCompany.applPassport|| ''}/>
                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Applicant's Country" name="applicantCountry" id="applicantCountry" value={selectedCompany.nationality|| ''}/>
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
  <form action="/compreg3" method='POST' className="sign-up-form">
    <h2 className="title"> New Registration</h2>
    <div className="input-field">
      <i className="bi bi-envelope"></i>
      <input type="text" placeholder="Email" name="emailaddr" id="emailaddr" value={selectedCompany.email|| ''}/>
    </div>
    <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Address" name="applicantAddr" id="applicantAddr" value={selectedCompany.applAddr1|| ''}/>
                  </div>
                  <div className="button-container">
    <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
    Previous
  </button>

    <input type="submit" className="thebtn next-btn" value="Register" onClick={handleSubmit}/>

</div>
  </form>

)}
</>
            )}

{selectedValue === "reprint" && (
              <>
                          {currentStep === 1 && (
                <form action="#" className="sign-up-form" method='POST'>
                  <h2 className="title">Re-Print Details</h2>
                  
                  <div className="input-field">
  <i className="bi bi-credit-card"></i>
  <div className="dropdown-container">
    <select className="dropdown" onChange={handleSelectChangePrint}>
    <option value="" disabled selected hidden>
      {selectedCompany.reservedName|| '  Select Reserved Name'}
      </option>
      {resultsprint.map((name, index) => (
                <option key={index} value={name.ReserveNumber}>{name.CompanyName}</option>
              ))}
    </select>
    <i className="bi bi-chevron-down dropdown-arrow"></i>
  </div>
</div>

<div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" placeholder="Reserve Name" value={selectedCompanyPrint.CompanyName|| ''}/>
              </div>
                  <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
                    Next
                  </button>
                </form>
              )}
              {currentStep === 2 && (
                <form action="#" className="sign-up-form" method='POST'>
                  <h2 className="title">Re-Print Details</h2>
                
              <div className="input-field">
                <i className="bi bi-calendar"></i>
                <input type="text"placeholder="Application Date" value={selectedCompanyPrint.RegistrationDate ? selectedCompanyPrint.RegistrationDate.slice(0, 10) : ''}/>

              </div>

              <div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" placeholder="Application's Name" value={selectedCompanyPrint.ApplicantName|| ''}/>
              </div>

              <div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" placeholder="Application's Surname" value={selectedCompanyPrint.ApplicantSurname|| ''}/>
              </div>
                  <div className="button-container">
                  <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
    Previous
  </button>

  <button type="button" className="thebtn next-btn" value="Print" onClick={handlePrint}>
  {loading ? 'Printing...' : 'Print'}
    </button>
</div>
                </form>
)}


</>
            )}
                  
          </div>
        </div>
        

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h1>Company Name Registration</h1>
              <p>
              Welcome to Company Registration, select the type of action to proceed to register a new Company or Re-Print Registration Details.
              </p>
              
            </div>
            <div className="image">
             
             </div>
                    </div>
          <div className="panel right-panel">
            <div className="content">
           
              <h3>Company Registration</h3>
              <p>
                If you have clicked the wrong action, you can return to the previous page by clicking the button below.
              </p>
              <button className="thebtn transparent" id="sign-in-btn">
                Back
              </button>
            </div>
           
          </div>
        </div>
      </div>
      
            <Footer/>
      
</div>
 
    </>
  );
};

export default CompanyRegistration;
