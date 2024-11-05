// pages/signup.tsx
"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import '../styles/styles.css';
import React from 'react';

const Register = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Company Registration</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div className="container">
        <h2><b>Company Registration</b></h2>
        <form>

        <div className="form-group">
          <label htmlFor="selectName">Select Reserved Name:</label>
           <select name="selectName" id="selectName">
             <option value="select">--SELECT--</option>
             <option value="poppy">POPPY (PROPRIETARY) LIMITED</option>
             <option value="sihliphi">SIHLIPHI (PROPRIETARY) LIMITED</option>
             <option value="sifuba">SIFUBA INVESTMENTS (PROPRIETARY) LIMITED</option>
             <option value="umenti">UMENTI INVESTMENTS (PROPRIETARY) LIMITED</option>
          </select>
          </div>

          <label htmlFor="reserveNumber">Reserve Number: </label>
          <input type="text" name="reserveNumber" id="reserveNumber" />

          <label htmlFor="applicantName">Applicant Name: </label>
          <input type="text" name="applicantName" id="applicantName" /> <br></br>

          <label htmlFor="forenames">Forenames: </label>
          <input type="text" name="forenames" id="forenames" />

          <label htmlFor="surname">Surname: </label>
          <input type="text" name="surname" id="surname" />

          <label htmlFor="applicantPIN">Applicant PIN: </label>
          <input type="text" name="applicantPIN" id="applicantPIN" />

          <label htmlFor="passportNumber">Passport Number: </label>
          <input type="text" name="passportNumber" id="passportNumber" />

          <label htmlFor="applicantCountry">Applicant's Country: </label>
          <input type="text" name="applicantCountry" id="applicantCountry" />

          <label htmlFor="emailaddr">E-mail Address: </label>
          <input type="text" name="emailaddr" id="emailaddr" />

          <label htmlFor="applicantAddr">Applicant's Address* </label>
          <input type="text" name="applicantAddr" id="applicantAddr" />
          
          <button className="register" type="submit">REGISTER COMPANY</button>
          <button type="button" onClick={() => router.push('exit.html')}>EXIT</button>
      
        </form>
      </div>
    </div>
  );
};

export default Register;
