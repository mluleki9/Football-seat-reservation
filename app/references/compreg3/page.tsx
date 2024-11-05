"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
 import '../styles/compreg3.css';
import React, { useEffect,useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import Footer from '../footer';
import Navbar from '../navOnPages';
import Image from 'next/head'
import Link from 'next/link';
import cookie from 'js-cookie';

interface Objectives {
  PrincipalObjective: string;
  ObjectiveCode: string;
}

const CompanyRegistration = () => {
  const router = useRouter();


  const [currentStep, setCurrentStep] = useState(1);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [rDate, setRDate] = useState("");
  const [surname, setSurname] = useState("");
  const [existMessage, setExistMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reservedNo, setReservedNo] = useState('');
  const [selectedValue,setSelectedValue] = useState<string>('');
  const [objectives, setObjectives] = useState<Objectives[]>([]);
  const [selectedObjValue,setObjectiveValue] = useState<string>('');
  const [phyaddress, setPhyAddress] = useState('');
  const [postaddress2, setPostAddress2] = useState('');
  const [reservedName, setReservedName] = useState('');
  const [rtnumber, setRtnumber] = useState('');
  const [parsedValue, setParsedValue] = useState([]);
  const [resultsprint, setResultsPrint] = useState<companyPrint[]>([]);




  let applID = cookie.get('applID');


  useEffect(() => {
    let value = cookie.get('selectedData');
    console.log("rrrrrrrrrrrrrrrrrrrr ", value)

    if (value !== undefined) {
      const parsedValue = JSON.parse(value);
      setParsedValue(parsedValue);
      setReservedNo(parsedValue.reservedNo);
      setReservedName(parsedValue.reservedName);
    } else {
      console.error("The 'selectedData' cookie is not set or has no value.");
    }
  }, []);


  
const formData = {
  applID: applID,
  parsedValue: parsedValue,
  rDate: rDate,
  rtnumber: rtnumber,
  receiptNumber: receiptNumber,
  selectedValue: selectedValue,
  selectedObjValue:selectedObjValue,
  phyaddress: phyaddress,
  postaddress2: postaddress2,

};

interface companyPrint {
  
  CIN:string;
  ComPObjective:string;
  applSurname:string;
  applname:string;
  compName:string;
  compNameType:string;
  expiryDate:string;
  phyaddress:string;
  postaddress:string;
  registrationDate:string;
}

const fetchData = async (event: React.FormEvent<HTMLFormElement>) => {
  console.log("inside fetch")
  event.preventDefault();
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:5001/Receiptcheck?receiptNumber=${receiptNumber}`);
    const data = await response.json();

        if(data.exist_message ==""){
       setExistMessage("");
       setRtnumber(data.message.amount)
       setRDate(data.message.receiptDate)
        }
        else{
          setExistMessage(data.exist_message)
          setRtnumber("")
          setRDate("")
          setReceiptNumber("")

        }


  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error: Failed to fetch data. Please try again later.');
  } finally {
    setLoading(false);
  }
 
};


const registerCompany = async (event: React.MouseEvent<HTMLButtonElement>) => {
  const query = new URLSearchParams(formData as any).toString();
  // router.push(`/PdfViewResource?${query}`, '_blank','noopener,noreferrer');
  window.open(`/PdfViewResource?${query}`, '_blank', 'noopener,noreferrer');

  console.log("inside fetch")
  event.preventDefault();
  setLoading(true);
  try {
   

    const response = await fetch('http://localhost:5001/registerCompany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json();
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn ", data.message)

    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjjjjjjjjjjjjjjjj ", data.resdata)

    setResultsPrint(data.resdata.ComPObjective);

    const CIN = data.resdata.CIN;
    const ComPObjective = data.resdata.ComPObjective;
    const applSurname = data.resdata.applSurname;
    const applname = data.resdata.applname;
    const compName = data.resdata.compName;
    const compNameType = data.resdata.compNameType;
    const expiryDate = data.resdata.expiryDate;
    const phyaddress = data.resdata.phyaddress;
    const postaddress = data.resdata.postaddress;
    const registrationDate = data.resdata.registrationDate;

    const formData1 = new FormData();
           formData1.append("CIN", CIN);
           formData1.append("ComPObjective", ComPObjective);
           formData1.append("applSurname", applSurname);
           formData1.append("applname", applname);
           formData1.append("compName", compName);
           formData1.append("compNameType", compNameType);
           formData1.append("expiryDate", expiryDate);
           formData1.append("phyaddress", phyaddress);
           formData1.append("postaddress", postaddress);
           formData1.append("registrationDate", registrationDate);
    

    // setResultsPrint(data.resdata);
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjjjjjjjjjjjjjjjj ", data.resdata.compNameType
      )

    const query = new URLSearchParams(formData1 as any).toString();
    // router.push(`/PdfViewResource?${query}`, '_blank','noopener,noreferrer');
    window.open(`/PdfViewResource?${query}`, '_blank', 'noopener,noreferrer');

  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error: Failed to fetch data. Please try again later.');
  } finally {
    setLoading(false);
  }
};

console.log("Results.....", resultsprint)

/////////////////////////////////////// Company Objectives start///////////////////////////////////
useEffect(() => {
  const fetchObjectives = async () => {
    try {
      const response = await fetch('http://localhost:5001/compObjectives');
      const data = await response.json();
      setObjectives(data);

    } catch (error) {
      console.error('Error fetching Countries:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchObjectives();
}, []);

/////////////////////////////////////// Company Objectives Ends///////////////////////////////////


const totalSteps = 3; // Total number of steps
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      delay: 10, // Adjust delay as needed (in milliseconds)
    });
  }, []);

  return (
    <>
  
      <Head>
        <title>Company Registration</title>
      </Head>
      <Navbar/>
<div className="page-wrapper">
    
  
      <div className="thecontainer">
        <div className="forms-container">
          <div className="signin-signup">
          
            <form className={`sign-in-form ${currentStep !== 1 ? 'hide-form' : ''}`} onSubmit={fetchData}>
              <h2 className="title">Receipt Number</h2>
              
              <div className="input-field">
                <i className="bi bi-123"></i>
             
                <input 
                  type="text"
                  name="receiptNumber" 
                  id="receiptNumber"
                  placeholder="Enter Receipt Number"  
                  value={receiptNumber} 
                  required 
                  onChange={(e) => setReceiptNumber(e.target.value)} 
             />
              </div>


          

<button className="thebtn go" id="sign-up-btn" disabled={loading || !receiptNumber} onClick={registerCompany}>
               
                {loading ? 'Searching...' : 'Search'}
                
              </button>
                
             
            </form>
            {currentStep === 1 && (
  <form action="#" className="sign-up-form">
    <h2 className="title">Company Registration</h2>
    
    <div className="input-field">
      <i className="bi bi-receipt"></i>
      <input 
        type="text" 
        placeholder="Receipt Details" 
        name="receiptdetails" 
        id="receiptdetails" 
        value={(rtnumber === '' || rDate === '') ? 'Invalid Receipt Detected. Try Again' : `${rtnumber} ${rDate}`} 
        readOnly 
      />
    </div>
    
    <div className="input-field">
      <i className="bi bi-123"></i>
      <input 
        type="text" 
        placeholder="RT Number" 
        value={reservedNo || ''} 
        readOnly 
      />
    </div>
    
    <div className="input-field">
      <i className="bi bi-building"></i>
      <input 
        type="text" 
        placeholder="Company Name" 
        value={reservedName || ''} 
        readOnly 
      />
    </div>
    
    {(rtnumber !== '' && rDate !== '') && (
      <button 
        type="button" 
        className="thebtn next-btn" 
        onClick={handleNextStep}
      >
        Next
      </button>
    )}
  </form>
)}
           
              {currentStep === 2 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Company Registration</h2>

                  <div className="input-field">
              <i className="bi bi-building"></i>
  <div className="dropdown-container">
    <select className="dropdown"  onChange={(e) => setSelectedValue(e.target.value)} value={selectedValue}>
      <option value="" disabled selected hidden>
        Company Type
      </option>
                <option value="1">Private Company</option>
                <option value="2">Public Company</option>
                <option value="3">Non-Profit Making</option>
    </select>
    <i className="bi bi-chevron-down dropdown-arrow"></i>
  </div>
</div>

<div className="input-field">
              <i className="bi bi-bullseye"></i>
  <div className="dropdown-container">
    <select className="dropdown" onChange={(e) => setObjectiveValue(e.target.value)} value={selectedObjValue}>
      <option value="" disabled selected hidden>Primary Objective</option>
        {objectives.map((objective, index) => (
          <option key={index} value={objective.ObjectiveCode}>{objective.PrincipalObjective}</option>
        ))}
      
    </select>
    <i className="bi bi-chevron-down dropdown-arrow"></i>
  </div>
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
    <h2 className="title">Company Registration</h2>
    <div className="input-field">
      <i className="bi bi-house"></i>
      <input type="text" placeholder="Company Physical Address"  value={phyaddress} onChange={(e) => setPhyAddress(e.target.value)}/>
    </div>
    <div className="input-field">
      <i className="bi bi-house"></i>
      <input type="text" placeholder="Company Postal Address"   value={postaddress2} onChange={(e) => setPostAddress2(e.target.value)}/>
    </div>
    
    <div className="button-container">
  <button type="button" className="thebtn" onClick={handlePreviousStep}>
    Previous
  </button>

  <button type="button" className="thebtn next-btn" onClick={registerCompany}>
  {loading ? 'Registering...' : 'Register'}
  </button>
</div>

  </form>

)}
          </div>
        </div>
        

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content" data-aos="fade-up">
              <h1>Company Registration</h1>

              <p>Welcome to Company Registration, continue the process of registering your company by entering the required information.</p>
           
       
            </div>
            
                    </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Invalid Reciept Number?</h3>
              <p>
                Click the button below, to return to the previous page inorder to insert a precise number.
              </p>
              <button className="thebtn transparent" id="sign-in-btn">
                Exit
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
