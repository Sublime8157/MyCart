const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sql = require('mssql');
const cors = require('cors'); 
const conn = require('../javascripts/database');
const validateRegistrationData = require('../middleware/validateRegistration');
const { sendEmail }  = require('../mail/sendEmailVerificationRegistration');

const saltRounds = 10; 
router.post('/', cors(), validateRegistrationData,  async (req, res) =>  {
    // get the data thrown by the origin assign to formData
    const formData = req.body;
    // extract the data
    const { username, email, birthDate, mobileNumber, address, password } = formData;
    // start the query 
    const query = `INSERT INTO tblUsers (Username, Email, BirthDate, MobileNo, Address, Password) VALUES (@username, @email, @birthDate, @mobileNumber, @address, @password)`; 

    try {
        // start a connection
        const pool = await conn.connect(); 
        const request = pool.request(); 
        await sendEmail(formData);
        const hashedPassword = await bcrypt.hash(password, saltRounds); 

        // bind the inputs 
        request.input('username', sql.VarChar, username); 
        request.input('email', sql.VarChar, email);
        request.input('birthdate', sql.Date, birthDate);
        request.input('mobilenumber', sql.VarChar, mobileNumber);
        request.input('address', sql.VarChar, address);
        request.input('password', sql.VarChar, hashedPassword); 
        // retrieve the result 
        await request.query(query);  
        // throw a response if success
        setTimeout(() => {
          res.json({
            status: "success",
            message: "You are successfully registered, kindly check your email for verification!",
          });
        }, 3000);           
    } catch(err) {    
        // if error throw an error status
        console.error('Error inserting data:', err); 
        return res.status(500).json({ message: "Error inserting data", error: err });
    }
});

module.exports = router; 