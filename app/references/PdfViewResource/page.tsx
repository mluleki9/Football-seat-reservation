"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

import { format, addMonths } from 'date-fns';
import { Document, Page, Text, View, StyleSheet, PDFViewer , Image,Font} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    textAlign: 'center',
    marginBottom: 0
  },
  ministryTitle: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Copperplate',
    color: '#3E5EB9',
    marginLeft: 20, // Adjust as needed for spacing between logo and title
    marginRight: 20, // Adjust as needed for spacing between title and flag
  },

  registrarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  compAct: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'Calibri',
    
   
  },
  section: {
    marginTop: 7,
    fontSize: 12,
    // marginTop:0,
    width:'100%',
    
  },
  table: {
    // display: "table",
    width: '100%',
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop:0,
    marginLeft:0,
 
    
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableColHeader: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
   
    padding: 5,
    // textAlign: 'center'
  },
  tableCol: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    // padding: 5
  },
  staticSection: {
    marginTop: 20,
    fontSize: 10
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Calibri',
    
  },
  imageContainer:{
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    width: '100%'
  },
  thecontainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, // Adjust as needed for spacing
    marginTop: 10,
    marginLeft:0,
    marginRight:0,
     // Adjust as needed for vertical spacing
  },

  leftimage: {
    height: 40,
    width: 60,
    marginRight: 'auto', // Pushes logo to the far left
    marginTop: 0,
    marginLeft:0,
  },
  rightimage: {
    height: 40,
    width: 60,
    marginLeft: 'auto', // Pushes flag to the far right
    marginTop: 0,
  },

  ackNow: {
    textAlign: 'center',
    fontSize: 15,
    
  
  },

  tableContainer: {
    flexDirection: 'row',
    marginLeft: 0, // Adjust as needed for left alignment
    marginTop: 0,
    marginRight:'auto',

  },
  column: {
    width: '20%',
    marginBottom: 10,
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
    marginBottom:0
  },
  columnValue: {
    fontSize: 10,
  },

  boldText: {
    fontWeight: 'bold',
    marginBottom:0,
    fontFamily: 'Calibri',
    fontSize:12
  },
  sectionSpacing: {
    marginBottom: 5,
  },
  borderedContainer: {
    width: '100%',
    border: '1 solid black', // Adjust border width and color as needed
    // Adjust padding as needed
    marginBottom:0,
    padding: 5,
  },


});

const PdfDocument = ({ data }: { data: { CIN:string; ComPObjective: string;
   
  
  applSurname: string;
    applname: string;
    compName: string;
    compNameType: string;
    expiryDate: string;
    phyaddress: string;
    postaddress: string;
    registrationDate: string;} }) => {

      const copperplateFont =Font.register({
        family:'Copperplate',
        src:'/fonts/copperplate-gothic-light.ttf',
      });
    
      const calibriFont =Font.register({
        family:'Calibri',
        src:'/fonts/calibri-bold.ttf',
      });
      return(
  <Document>
     <Page style={styles.page}>
    <View style={styles.header}>
      <View style={styles.thecontainer}>
        <Image src="/logo.png" style={styles.leftimage}/>
        <Text style={[styles.ministryTitle, { flex: 1, textAlign: 'center' }]}>Ministry of Commerce, Industry and Trade</Text>
        <Image src="/theflag.png" style={styles.leftimage}/>
        </View>
        <View style={styles.imageContainer}>
          <Image src="/reserveheader.png" style={styles.image} />
        </View>
        

        <Text style={styles.registrarTitle}>REGISTRAR OF COMPANIES</Text>
        <Text style={styles.compAct}>[Company Act 8 of 2009]</Text>
        <View style={styles.borderedContainer}>
        <Text style={styles.ackNow}>Acknowledgement Of Company Name Reservation</Text>
        </View>
      </View>


      <View style={styles.section}>

      <View style={styles.table}>
        <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>CIN:</Text>
            <Text style={styles.tableCol}>{data.CIN}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Company Objectives:</Text>
            <Text style={styles.tableCol}>{data.ComPObjective}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Applicant Surname:</Text>
            <Text style={styles.tableCol}>{data.applSurname}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Applicant Name:</Text>
            <Text style={styles.tableCol}>{data.applname}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Company Name:</Text>
            <Text style={styles.tableCol}>{data.compName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Company Name Type:</Text>
            <Text style={styles.tableCol}>{data.compNameType}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Expiry Date:</Text>
            <Text style={styles.tableCol}>{data.expiryDate}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Physical Address:</Text>
            <Text style={styles.tableCol}>{data.phyaddress}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Postal Address:</Text>
            <Text style={styles.tableCol}>{data.postaddress}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Registration Date:</Text>
            <Text style={styles.tableCol}>{data.registrationDate}</Text>
          </View>
          
        </View>
      </View>

      <View style={[styles.section, styles.staticSection]}>
        <Text style={styles.title}>Registration fees are as follows:</Text>
        <View style={styles.tableContainer}>
        {/* Nominal Capital column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Nominal Capital:</Text>
          <Text style={styles.columnValue}>E 100 - E 10 000</Text>
          <Text style={styles.columnValue}>E 10 000 - E 30 000</Text>
          <Text style={styles.columnValue}>E 30 000 - E 50 000</Text>
          <Text style={styles.columnValue}>E 50 000 and Above</Text>
        </View>

        {/* Fee Amount column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Fee Amount:</Text>
          <Text style={styles.columnValue}>E 645.00</Text>
          <Text style={styles.columnValue}>E 945.00</Text>
          <Text style={styles.columnValue}>E 1 245.00</Text>
          <Text style={styles.columnValue}>E 1 845.00</Text>
        </View>
        </View>


  <View style={styles.sectionSpacing}>
  < Text style={[styles.boldText]}>CONTACTS</Text>
  <Text style={[styles.boldText]}>P. O. BOX 451</Text>
  <Text style={[styles.boldText]}>Mbabane</Text>
  <Text style={[styles.boldText]}>Phone: +268 2404 2372</Text>
  <Text style={[styles.boldText]}>Fax: +268 2404 4711</Text>
  </View>

        
  <View style={styles.sectionSpacing}>
  <Text style={[styles.boldText]}>Disclaimer!</Text>
  <Text style={[styles.boldText]}>Please Note- this is not a certificate but an acknowledgement of company name reservation valid for 3 months and is not to be used beyond the expiry date. Should this expire, please visit the Registrar of Companies office. Pay fees due at your nearest revenue offices to complete the company registration process.</Text>
  </View>
</View>
    </Page>
  </Document>
  );
};


const PdfViewResource = () => {
  const searchParams = useSearchParams();

  if (!searchParams) {
    return <div>Loading...</div>;
  }

  const CIN = searchParams.get('CIN') || '';
  const ComPObjective = searchParams.get('ComPObjective') || '';
  const applSurname = searchParams.get('applSurname') || '';
  const applname = searchParams.get('applname') || '';
  const compName = searchParams.get('compName') || '';
  const compNameType = searchParams.get('compNameType') || '';
  const expiryDate = searchParams.get('expiryDate') || '';
  const  phyaddress = searchParams.get('phyaddress') || '';
  const postaddress = searchParams.get('postaddress') || '';
  const registrationDate = searchParams.get('registrationDate') || '';

//   const RegistrationDate = new Date();
//   const formattedRegistrationDate = format(RegistrationDate, 'EEEE, MMMM d, yyyy');
//   const ExpireDate = addMonths(RegistrationDate, 3);
//   const formattedExpireDate = format(ExpireDate, 'd MMMM yyyy');

  const data = {
    CIN,
    ComPObjective,
    applSurname,
    applname,
    compName,
    compNameType,
    expiryDate,
    phyaddress,
    postaddress,
    registrationDate,
  };

  return (
    <PDFViewer width="100%" height="600">
      <PdfDocument data={data} />
    </PDFViewer>
  );
};

export default PdfViewResource;