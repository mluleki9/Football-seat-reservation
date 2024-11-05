"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
 import '../styles/newcompanynamereservation.css';
// import '../styles/styles.css';
import React, { useEffect,useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import Footer from '../footer';
import NavigationOnPages from '../navOnPages';
import Image from 'next/head'
import cookie from 'js-cookie';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewCompanyNameReservation = () => {
  const [companyName, setCompanyName] = useState('')
  const [translatedName, settranslatedName] = useState('')
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState('');
  const router = useRouter();

  
  const validateReserve = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
  
    if (companyName !== translatedName) {
      const selectElement = document.getElementById('comptype') as HTMLSelectElement;
      const selectValue = selectElement.value; // Get the value from the select element
      console.log("different", selectValue);
  
      const value = cookie.get('applID');
      console.log("Cookie Value", value);
  
      const formData = {
        value, selectValue, companyName, translatedName
      };

      // EMEMBE TO EMOVE THIS SECTION WHEN CONNECTED

      const query = new URLSearchParams(formData as any).toString();
      //router.push(`/PdfReserve?${query}`);
      window.open(`/PdfReserve?${query}`, '_blank', 'noopener,noreferrer');

      // END OF REMOVAL SECTION

      setLoading(true);
      try {
        const response = await fetch('http://localhost:5001/compReserve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }), // Serialize the formData object to JSON
        });
  
        if (response.ok) {
          const data = await response.json();
          setResults(data);
          console.log("The data.......", data);

          let RTnumber = data.RTNumber;
          console.log("RT number......", RTnumber)
          
          if (data.message=="success"){
            // window.location.href="/success"

            const successsignup = document.getElementById("successsignup");
            if (successsignup) {
              successsignup.style.display = "block"; // or "inline" or "inline-block" depending on your layout
              setTimeout(() => {
                successsignup.style.display = "none";
              }, 5000);
            }
           const formData = new FormData();
           formData.append("RTNumber", RTnumber);
           formData.append("selectValue", selectValue);
           formData.append("companyName", companyName);
           formData.append("translatedName", translatedName);


            const query = new URLSearchParams(formData as any).toString();
            //router.push(`/PdfReserve?${query}`);
            window.open(`/PdfReserve?${query}`, '_blank', 'noopener,noreferrer');
            
          }
          else if(data.message=="Already Exist"){
  
    // Select the element with id "errortxt"
  const errorTextElement = document.getElementById("errortxt");
  
  // Check if the element exists
  if (errorTextElement) {
      // Store the original text content
      const originalTextContent = errorTextElement.textContent;
  
      // Set the text content to the error message
      errorTextElement.textContent = "Company with Name Already Exist, Try Another Name";
  
      // Display the error message element
      errorTextElement.style.display = "block"; // or "inline" or "inline-block" depending on your layout
  
      // Hide the error message and restore original text content after 5 seconds
      setTimeout(() => {
          errorTextElement.style.display = "none";
          // Restore the original text content
          errorTextElement.textContent = originalTextContent;
      }, 5000);
  } else {
      console.error("Element with id 'errortxt' not found.");
  }
  
  
          }
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    } else {
      const errorText = document.getElementById("errortxt");
      if (errorText) {
        errorText.style.display = "block"; // or "inline" or "inline-block" depending on your layout
  
        setTimeout(() => {
          errorText.style.display = "none";
        }, 5000);
      }
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      delay: 10, // Adjust delay as needed (in milliseconds)
    });
  }, []);


return(
    <>
   
{/*   
  <Head>
    <title> Company Name Search</title>
  </Head> */}
   
      
      <NavigationOnPages/>
<div className="page-wrapper">
    
  
      <div className="thecontainer">
        <div className="forms-container">
          <div className="signin-signup">
          
            <form className="sign-in-form" method='POST'>
              <h2 className="title">Reserve <br />Company Name</h2>
              <p id="successsignup">Company Name Reserved Successfully</p>
              
              <div className="input-field">
  <i className="bi bi-building"></i>
  <div className="dropdown-container">

    
   <select name="comptype" id="comptype" className="dropdown"
                     >
             <option value="PRIVATE COMPANY">Private Company</option>
             <option value="PUBLIC COMPANY">Public Company</option>
             <option value="NON PROFIT MAKING">Non-Profit Making Company</option>
          </select>
          <i className="bi bi-chevron-down dropdown-arrow"></i>
  </div>
</div>

              <div className="input-field">
                <i className="bi bi-bookmark-check"></i>
                <input type="text" placeholder="Company Name"  name="compname" id="compname" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              </div>
              
            
              <div className="input-field">
                <i className="bi bi-translate"></i>
                <input type="text" placeholder="Translated Name" name="transname" id="transname" value={translatedName} onChange={(e) => settranslatedName(e.target.value)} required />
              </div>
              <p id="errortxt" className="error-message">
                Company and Translated name is duplicated
            </p>
              
        

              <div className="buttons">
              <button type="button" className="exitbtn solid" onClick={() => router.push('/Home')}>EXIT</button>
              <button type="submit"  className="thebtn solid" onClick={validateReserve}>
              {loading ? 'Submitting...' : 'Submit'}
              </button>
              
              </div>


            </form>
            </div>
            </div>

            <div className="panels-container">
          <div className="panel left-panel">
            <div className="content" data-aos="fade-up">
              <h1>Reserve <br /> Company Name</h1>
              <p>
              Secure your ideal company name today! 
              Reserving a name ensures it is held exclusively for you for a limited period.
              </p>
              
            </div>
            </div>
             
                    </div>

        
    

</div>
<Footer/>
</div>

</>
);
};
export default NewCompanyNameReservation;