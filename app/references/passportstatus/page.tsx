'use client'
import React, { useEffect, useState } from 'react';
import '../styles/passportstatus.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos';
import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import NavigationOnPages from '../navOnPages';
import Footer from '../footer';
import Head from 'next/head';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PassportStatus = () => {
  const [pin, setPin] = useState('');
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [Descr_value, setDescr_value] = useState('');
  const [pinError, setPinError] = useState('');

  const validatePin = (pin: string) => {
    const pinRegex = /^\d{13}$/;
    if (!pinRegex.test(pin)) {
      if (/[^\d]/.test(pin)) {
        return 'PIN should only contain digits.';
      } else if (pin.length !== 13) {
        return 'PIN should be exactly 13 digits long.';
      }
    }
    return '';
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPin(value);
    const error = validatePin(value);
    setPinError(error);
  };

  const fetchData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pinError) {
      alert(pinError);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/passportVerify?pin=${pin}`);
      const data = await response.json();
      console.log('Response data:', data);

      const splitData = data.data.split(':');

      if (splitData.length < 5 || splitData[0].trim() === '') {
        setName(null);
        setSurname(null);
        setGender(null);
        alert('PIN not found or the provided PIN does not exist.');
      } else {
        setName(splitData[0].trim());
        setSurname(splitData[1].trim());
        setGender(splitData[4].trim());
      }

      setDescr_value(data.Descr_value || ''); // Correctly set Descr_value from the parsed JSON
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error: Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
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

  return (
    <>
      <NavigationOnPages />
      <div className="page-wrapper">
        <div className="thecontainer">
          <div className="forms-container">
            <div className="signin-signup">
              <form className="sign-in-form" onSubmit={fetchData}>
                <h2 className="title">Passport Status</h2>
                {pinError && (
        <div className="error-message">
          <i  className="bi bi-exclamation-circle-fill" id="error-icon" /> 
          <p>{pinError}</p></div> )}
                <div className="input-field">
                  <i className="bi bi-123"></i>
                  <input
                    placeholder="Enter Pin"
                    type="text"
                    name="pin"
                    id="pin"
                    value={pin}
                    required
                    onChange={handlePinChange}
                  />
                </div>
              
                <button type="submit" className="thebtn solid" disabled={loading || !!pinError}>
                {loading ? 'Searching...' : 'Search'}
                </button>
                <div className="input-field">
                  <i className="bi bi-person"></i>
                  <input type="text" placeholder="Name" name="name" id="name" value={name || ''} readOnly />
                </div>
                <div className="input-field">
                  <i className="bi bi-person"></i>
                  <input type="text" placeholder="Surname" name="surname" id="surname" value={surname || ''} readOnly />
                </div>
                <div className="input-field">
                  <i className="bi bi-passport"></i>
                  <input type="text" placeholder="Passport Status" name="passportStatus" id="passportStatus" value={Descr_value || ''} readOnly style={{ width: '300px' }} />
                </div>
              </form>
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content" data-aos="fade-up">
                <h1>Check your <br />Passport Status</h1>
                <p>Find out the current status of your passport, including issuance and expiration dates.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PassportStatus;
