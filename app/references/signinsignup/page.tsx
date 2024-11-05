"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
 import '../styles/signinsignup.css';
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
import AOS from 'aos';
import 'aos/dist/aos.css';

interface country {
  name: string;
}


const CompanyNameReservation = () => {

  const router = useRouter();
  const totalSteps = 5; // Total number of steps
  const [currentStep, setCurrentStep] = useState(1);
  
///////////////////////////////////////////////////////////SIGN IN CODE////////////////////////////////////////////////////////////// 


//////////////////STATE VARIABLES//////////////
const [password, setPassword] = useState<string>('');
const [forename1, setName] = useState<string>('');
const [loading, setLoading] = useState<boolean>(false);


////////// Form validation function
const isFormValid = (): boolean => {
  return forename1 !== "" && password !== "";
};


// Login/registration function
async function loginPage() {
  setLoading(true);

  console.log("testing 01 ------------------------", forename1, password)
  if (isFormValid()) {
    const formData = {
    forename1, password
    };
  
    try {
      console.log("testing 01 ------------------------", formData)
      const response =  await fetch('http://localhost:5001/loginSubmit', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

      if (response.ok) {

        const data = await response.json();
        console.log('Submit response 123456:', data.message);
        // session here
        // Storing values in cookies
        cookie.set('applID', forename1);

        //redirect to register page
         window.location.href = "/Home";
  
         }
      
      else {
        const errorText = document.getElementById("errortxt");
        if (errorText) {
          errorText.style.display = "block"; // or "inline" or "inline-block" depending on your layout
       
          setTimeout(() => {
            errorText.style.display = "none";
          }, 5000); 
        }
      }

    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error: Failed to submit data. Please try again later.');
    } finally {
      setLoading(false);
    }
  } else {
     
    console.log("invalid form data")
  }
}
///////////////////////////////////////////////////////////SIGN IN CODE ENDS////////////////////////////////////////////////////////////// 

/////////////////////////////////////////////////SIGN UP CODE STARTS//////////////////////////////////////////////////////
const [countries, setCountries] = useState<country[]>([]);
const [selectedCountry, setSelectedCountry] = useState<string>('');
const [pin, setPin] = useState<string>('');
const [forename01, setNameSignUp] = useState<string>('');
const [forename2, setForename2] = useState<string>('');
const [surname, setSurname] = useState<string | null>(null);
const [address1, setAddress1] = useState<string>('');
const [address2, setAddress2] = useState<string>('');
const [address3, setAddress3] = useState<string>('');
const [address4, setAddress4] = useState<string>('');
const [passport, setPassport] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [phone, setPhone] = useState<string>('');
const [cellphone, setCellphone] = useState<string>('');
const [fax, setFax] = useState<string>('');
const [username, setUsername] = useState<string>('');
const [password01, setPassword01] = useState<string>('');
const [confirmPassword01, setConfirmPassword01] = useState<string>('');
const [showAddressFields, setShowAddressFields] = useState<boolean>(false);
// const [errors, setErrors] = useState<{ [key: string]: string }>({});
const [message, setMessage] = useState<string>('');
const [isPasswordVisible, setIsPasswordVisible] = useState(false);

const [errors, setErrors] = useState<{
  selectedCountry: React.JSX.Element | null;
  passport: React.JSX.Element | null;
  forename01: React.JSX.Element | null;
  forename02: React.JSX.Element | null;
  surname: React.JSX.Element | null;
  address1: React.JSX.Element | null;
  address2: React.JSX.Element | null;
  address3: React.JSX.Element | null;
  address4: React.JSX.Element | null;
  phone: React.JSX.Element | null;
  username: React.JSX.Element | null;
  password01: React.JSX.Element | null;
  confirmPassword01: React.JSX.Element | null;
  pin?: React.JSX.Element | null;
  email?: React.JSX.Element | null;
}>({
  selectedCountry: null,
  passport: null,
  forename01: null,
  forename02: null,
  surname: null,
  address1: null,
  address2: null,
  address3: null,
  address4: null,
  phone: null,
  username: null,
  password01: null,
  confirmPassword01: null,
  pin: null,
  email: null,
});


useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:5001/countries');
      const data = await response.json();
      setCountries(data);

    } catch (error) {
      console.error('Error fetching Countries:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchCountries();
}, []);

const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
  const newErrors = {};
  setSelectedCountry(event.target.value);
  
  setShowAddressFields(false);
};

  //////////////////////////////GET PIN START/////////////////////////////
  const SignUpfetchData = async (pin: string) => {
    // event.preventDefault();
   
    setLoading(true);
    try {
      console.log("Inside function",pin)
      const response = await fetch(`http://localhost:5001/pinverify?pin=${pin}`);
      const data = await response.text();
      const splitData = data.split(':');

      if (splitData.length < 5 || splitData[0].trim() === '') {
        setNameSignUp('');
        setSurname(null);
        alert('PIN not found or the provided PIN does not exist.');
      } else {

        setSurname(splitData[1].trim());
        setShowAddressFields(true);
        
        let tempname = splitData[0];
        if (!tempname.includes(' ')) {
          // tempname has no space
          setNameSignUp(tempname);
          setForename2("");
        } else {
          // tempname has a space
          let nameParts = tempname.split(' ');
          setNameSignUp(nameParts[0]);
          setForename2(nameParts.slice(1).join(' '));
        }

      } 
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error: Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };   // //////////////////////////////GET PIN END////////////////////////////////////

///////////////////////////HANDLES PIN CHANGE ONCHANGE STARTS//////////////////////////
const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setPin(value);

  if (/[a-zA-Z]/.test(value)) {
    setErrors({ pin: 'PIN should only contain digits' });
    setNameSignUp('');
    setForename2('');
    setSurname(null);
    setShowAddressFields(false);
    return;
  }

  if (value.length !== 13) {
    setErrors({ pin: 'PIN must be exactly 13 digits long' });
    setNameSignUp('');
    setForename2('');
    setSurname(null);
    setShowAddressFields(false);
    return;
  }

  setErrors({}); // Clear previous errors if any
  SignUpfetchData(value);
};
///////////////////////////HANDLES PIN CHANGE ONCHANGE ENDS//////////////////////////


// useEffect(() => {
//   validateForm();
// }, []);

// const validateForm = () => {
//   const newErrors : { [key: string]: string} = {};

//   if (!passport) {
//     setErrors({...errors, passport : 'Passport is required'}) 
//   }
//   if (!username) {
//     setErrors({ ...errors, username: 'Username is required' });
//     return;
//   }
//   if (!password01) {
//     setErrors({ ...errors, password01: 'password01 is required' });
//     return;
//   }
//   setErrors(newErrors);
// };


const isFormValidSignUp = (): boolean => {
  if (selectedCountry.toLowerCase() === 'swaziland') {
    return Boolean(
      selectedCountry &&
      pin &&
      forename01 &&
      surname &&
      address1 &&
      email &&
      phone &&
      username &&
      password01 &&
      confirmPassword01 &&
      password01 === confirmPassword01
    );
  }
  return Boolean(
    selectedCountry &&
    address1 &&
    passport &&
    email &&
    phone &&
    username &&
    password01 &&
    confirmPassword01 &&
    password01 === confirmPassword01
  );
};


const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setLoading(true);
  if (isFormValidSignUp()) {

    const formData = {
      pin, selectedCountry, forename01, forename2, surname, address1, address2, address3, passport, email, phone, cellphone, fax, username, password01
    };

  try {
      const response = await fetch('http://localhost:5001/submitdata', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // alert(data.message);
      if(data.message=="Data inserted successfully"){
      const errorsignup = document.getElementById("successsignup");
      if (errorsignup) {
        errorsignup.style.display = "block"; // or "inline" or "inline-block" depending on your layout
     
        setTimeout(() => {
          errorsignup.style.display = "none";
        }, 5000); 
      }
    }
    else{
      const errorsignup = document.getElementById("errorsignup");
      if (errorsignup) {
        errorsignup.style.display = "block"; // or "inline" or "inline-block" depending on your layout
     
        setTimeout(() => {
          errorsignup.style.display = "none";
        }, 5000); 
      }
    }
      console.log('Submit response:', data);      
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error: Failed to submit data test. Please try again later. '+ error);
    } finally {
      setLoading(false);
    }
  }
  else{
    console.error('Form has errors')
    alert('Error: Invalid Form Data. Please try again.');
    // validateForm();
  }
  };
  function mohe(){
     window.location.href = "/compregistration";
  }
///////////////////////////////////////////////////// SIGNUP ///////////////////////////////////////////


/////////////////////////////////////////////// FORGOT PASSWORD STARTS /////////////////////////////////////////////


const forgotPassword = async (email: string) => {

    try{
  const response = await fetch('http://localhost:5001/forgotPassword', {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email}),
  });

  const data = await response.json();

  if( data.success){
    setMessage('Password reset email sent.');

  }else{
    setMessage('Error sending password reset email.')
  }
}catch (error) {
  setMessage('Error sending password reset email.');
  console.error("Error:", error);
}
};


//////////////////////////////////////////////// FORGOT PASSWORD ENDS /////////////////////////////////////////////




const handleNextStep = () => {
  const newErrors: { [key: string]: string } = {};

  // Validate Selected Country field
  // if (!selectedCountry) {
  //   newErrors.selectedCountry = 'Select Your Country First';
  // }
  // if (selectedCountry) {
  //   setErrors((prevErrors) => {
  //     const { selectedCountry, ...otherErrors } = prevErrors;
  //     return otherErrors;
  //   });
  // }

  // Validate PIN field
  if (pin === '' || pin.length !== 13 ) {
    newErrors.pin = '';
  }
  
  // Update error state
  setErrors(newErrors);
  
  // Check if there are no errors before proceeding to the next step
  if (Object.keys(newErrors).length === 0) {
    setCurrentStep(currentStep + 1);
  }
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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });
}, []);


  // const [error, setError] = useState<string>('');

  // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setEmail(value);

  //   // Basic email validation pattern
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
  //   if (!value.includes('@')) {
  //     setErrors('Email must contain "@" character.');
  //   } else if (!emailPattern.test(value)) {
  //     setErrors('Please enter a valid email address.');
  //   } else {
  //     setErrors('');
  //   }
  // };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrors({ email: 'Please enter a valid email address' });
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Clear email error if valid
    }
  };

  return (
    <>
{/*   
      <Head>
        <title>Signin </title>
      </Head> */}
      <NavigationOnPages/>
<div className="page-wrapper">
    
  
      <div className="thecontainer">
        <div className="forms-container">
          <div className="signin-signup">
          
            <form className={`sign-in-form ${currentStep !== 1 ? 'hide-form' : ''}`} onSubmit={handleSubmit}>
              <h2 className="title">Sign in</h2>
           
              <div className='error-message'> <i  className="bi bi-exclamation-circle-fill" id="error-icon" /> <p>Username and Password incorrect</p></div>
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" name="forename1" id="username" required  onChange={(e) => setName(e.target.value)} value={forename1}/>
              </div>
              <div className="input-field">
  <i className="bi bi-key"></i>

    <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
  
  
</div>
                {/* <button type="button" className="password-toggle-btn" onClick={togglePasswordVisibility}> */}
        
      {/* </button>  */}
      

                <button type="button" onClick={loginPage} className="thebtn solid" >LOGIN</button>
                {/* <button type="button" onClick={forgotPassword} className="thebtn solid" >FORGOT PASSWORD</button> */}
          
            </form>
            
            {currentStep === 1 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Sign up </h2>
                  {errors.pin && (<div className="error-message">
          <i  className="bi bi-exclamation-circle-fill" id="error-icon" /><p> {errors.pin}</p>
          </div>)}
                  
                  <div className="input-field">
                    <i className="bi bi-flag"></i>
                    <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                      <option value="">Select a country</option>
                        {countries.map((country, index) => (
                      <option key={index} value={country.name}>{country.name}</option>
                      ))}
                    </select>
                    <i className="bi bi-chevron-down dropdown-arrow"></i>
                  </div>
                  {errors.selectedCountry && (<p style={{ color: "red", textAlign: "inherit", flexDirection: "row" }}>{errors.selectedCountry}</p>)}
                  {selectedCountry && (
          <div>
            {selectedCountry.toLowerCase() === 'swaziland' ? (
                  <div className="input-field">
                    <i className="bi bi-person-badge"></i>
                    <input type="text" placeholder="Applicant ID"  name="pin" id="pin" value={pin} onChange={handlePinChange} />
                               
                  </div>
                  
                        ) : (
                  <div className="input-field">
                    <i className="bi bi-person-badge"></i>
                    <input type="text" placeholder="Passport No."  name="passport" id="passport" onChange={(e) => setPassport(e.target.value)} required />
                    {errors.passport && <div className="error">{errors.passport}</div>}
                  </div>
                      )}
                      </div>
                    )}
                  
                  <button type="button" className="thebtn next-btn" onClick={handleNextStep}>
                  {loading ? 'Loading...' : 'Next'}
                  </button>
                  
                </form>
              )}
              {currentStep === 2 && (
                <form action="#" className="sign-up-form">
                  <h2 className="title">Sign up</h2>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Forename One"  name="forename01" id="forename01" value={forename01 || ''} readOnly />
                    {errors.forename01 && <div className="error">{errors.forename01}</div>}
                  </div>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Forename Two"  name="forename02" id="forename01" value={forename2|| ''} readOnly />
                    {errors.forename02 && <div className="error">{errors.forename02}</div>}
                  </div>
                  <div className="input-field">
                    <i className="bi bi-person"></i>
                    <input type="text" placeholder="Surname" name="surname" id="surname" value={surname || ''} readOnly />
                    {errors.surname && <div className="error">{errors.surname}</div>}

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
                  <h2 className="title">Sign up </h2>
              
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Physical Address 1" name="address1" id="address1" value={address1} onChange={(e) => setAddress1(e.target.value)} required />
                    {errors.address1 && <div className="error">{errors.address1}</div>}

                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Physical Address 2" name="address2" id="address2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    {errors.address2 && <div className="error">{errors.address2}</div>}
                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Physical Address 3" name="address3" id="address3" value={address3} onChange={(e) => setAddress3(e.target.value)} />
                    {errors.address3 && <div className="error">{errors.address3}</div>}

                  </div>
                  <div className="input-field">
                    <i className="bi bi-house"></i>
                    <input type="text" placeholder="Postal Address" name="address4" id="address4" value={address4} onChange={(e) => setAddress4(e.target.value)} />
                    {errors.address4 && <div className="error">{errors.address4}</div>}
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
    <h2 className="title">Sign up</h2>
    
    {errors.email && <p className="error-message">{errors.email}</p>}
    <div className="input-field">
      <i className="bi bi-envelope"></i>
      <input type="text" placeholder="Email" name="email" id="email" value={email}  onChange={handleEmailChange}/>
    </div>
  

  
    <div className="input-field">
      <i className="bi bi-telephone"></i>
      <input type="text" placeholder="Telephone Number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      {errors.phone && <div className="error">{errors.phone}</div>}

    </div>
    <div className="input-field">
      <i className="bi bi-phone"></i>
      <input type="text" placeholder="Cellphone Number"  name="cellphone" id="cellphone" value={cellphone} onChange={(e) => setCellphone(e.target.value)} />
    </div>

    <div className="input-field">
      <i className="bi bi-printer"></i>
      <input type="text" placeholder="Fax Number"  name="fax" id="fax" value={fax} onChange={(e) => setFax(e.target.value)} />
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
  <form onSubmit={handleSignUpSubmit} className="sign-up-form">
    <h2 className="title">Sign up - Step 5</h2>
    <p id="successsignup">User Registered Successfully. Try & Login</p>
    <p id="errorsignup">Username Already Exists. Try to login Or Choose another one</p>
    <div className="input-field">
      <i className="bi bi-person"></i>
      <input type="text" placeholder="Username"  name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      
    </div>
    {errors.username && (
          <p style={{ color: "red", textAlign: "inherit", flexDirection: "row" }}>
            {errors.username}
          </p>
        )}
    <div className="input-field">
      <i className="bi bi-key"></i>

      <input type="password" placeholder="Password" name="password01" id="password01" value={password01} onChange={(e) => setPassword01(e.target.value)} />

    </div>
    {errors.password01 && (
          <p style={{ color: "red", textAlign: "inherit", flexDirection: "row" }}>
            {errors.password01}
          </p>
        )}
    <div className="input-field">
      <i className="bi bi-key"></i>
      <input type="password" placeholder="Confirm Password" name="confirm_password01" id="confirm_password01" value={confirmPassword01} onChange={(e) => setConfirmPassword01(e.target.value)} />
                    

    </div>
    {errors.confirmPassword01 && <div className="error">{errors.confirmPassword01}</div>}
                       
    <div className="button-container">
    <button type="button" className="thebtn prev-btn" onClick={handlePreviousStep}>
    Previous
  </button>
  <input type="submit" className="thebtn next-btn" value="Sign up" id="sign-up-btn" />
</div>

                </form>
              )}
          </div>
        </div>
        

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content"  data-aos="fade-up">
              <h1>Account Sign-In</h1>
              <p>
              Enter your sign-in credentials to access our<br /> Eswatini Government Online Services.
              </p>
              <h2>
                <p>Do not have an account? Click the button below to Sign Up</p>
              </h2>
              <button className="thebtn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <div className="image">
             
             </div>
                    </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already Signed Up ?</h3>
              <p>
                If you already have an existing account, kindly click the sign in button below.
              </p>
              <button className="thebtn transparent" id="sign-in-btn">
                Sign in
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

export default CompanyNameReservation;
